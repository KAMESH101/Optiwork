import { useState } from 'react';
import { Message, User } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ScrollArea } from '../ui/scroll-area';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  MessageSquare, 
  Send, 
  Star, 
  Megaphone, 
  Clock, 
  MessageCircle,
  X,
  CheckCheck,
  ArrowLeft
} from 'lucide-react';
import { Label } from '../ui/label';
import { toast } from 'sonner@2.0.3';

interface MessagesPanelProps {
  currentUser: User;
  users: User[];
  messages: Message[];
  onSendMessage: (message: Omit<Message, 'id' | 'createdAt' | 'isRead'>) => void;
  onMarkAsRead: (messageId: string) => void;
  onBack?: () => void;
  isAdmin?: boolean;
}

export function MessagesPanel({
  currentUser,
  users,
  messages,
  onSendMessage,
  onMarkAsRead,
  onBack,
  isAdmin = false
}: MessagesPanelProps) {
  const [showCompose, setShowCompose] = useState(false);
  const [newMessage, setNewMessage] = useState({
    type: 'announcement' as Message['type'],
    title: '',
    content: '',
    to: 'all', // Changed from empty string to 'all'
    priority: 'medium' as Message['priority']
  });

  const userMessages = messages.filter(m => {
    // Show messages where:
    // 1. Message was sent TO me specifically
    // 2. Message was sent BY me (so I can see sent messages)
    // 3. Broadcast message (no specific recipient) that I didn't send
    const sentToMe = m.to === currentUser.id;
    const sentByMe = m.from === currentUser.id;
    const isBroadcastFromOthers = !m.to && m.from !== currentUser.id;
    
    return sentToMe || sentByMe || isBroadcastFromOthers;
  });

  const unreadCount = userMessages.filter(m => !m.isRead && m.to === currentUser.id).length;

  const getMessagesByType = (type: string) => {
    if (type === 'all') return userMessages;
    return userMessages.filter(m => m.type === type);
  };

  const getMessageIcon = (type: Message['type']) => {
    switch (type) {
      case 'appreciation':
        return <Star className="w-5 h-5 text-yellow-500" />;
      case 'announcement':
        return <Megaphone className="w-5 h-5 text-blue-500" />;
      case 'reminder':
        return <Clock className="w-5 h-5 text-orange-500" />;
      case 'feedback':
        return <MessageCircle className="w-5 h-5 text-purple-500" />;
      default:
        return <MessageSquare className="w-5 h-5" />;
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.title.trim()) {
      toast.error('Please enter a message title');
      return;
    }
    
    if (!newMessage.content.trim()) {
      toast.error('Please enter message content');
      return;
    }

    const recipientUser = newMessage.to !== 'all' ? users.find(u => u.id === newMessage.to) : undefined;

    try {
      onSendMessage({
        type: newMessage.type,
        title: newMessage.title,
        content: newMessage.content,
        from: currentUser.id,
        fromName: currentUser.name,
        to: newMessage.to !== 'all' ? newMessage.to : undefined,
        toName: recipientUser?.name,
        priority: newMessage.priority
      });

      // Reset form
      setNewMessage({
        type: 'announcement',
        title: '',
        content: '',
        to: 'all',
        priority: 'medium'
      });
      setShowCompose(false);
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            {onBack && (
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            <div className="flex items-center gap-3 flex-1">
              <MessageSquare className="w-6 h-6 text-blue-600" />
              <div>
                <h1>Messages & Communications</h1>
                {unreadCount > 0 && (
                  <p className="text-sm text-muted-foreground">
                    {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>
            <Button onClick={() => setShowCompose(true)} className="gap-2">
              <Send className="w-4 h-4" />
              New Message
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showCompose ? (
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Compose Message</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setShowCompose(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Message Type</Label>
                  <Select
                    value={newMessage.type}
                    onValueChange={(value: Message['type']) =>
                      setNewMessage({ ...newMessage, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="appreciation">⭐ Appreciation</SelectItem>
                      <SelectItem value="announcement">📢 Announcement</SelectItem>
                      <SelectItem value="reminder">⏰ Reminder</SelectItem>
                      <SelectItem value="feedback">💬 Feedback</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Send To</Label>
                  <Select
                    value={newMessage.to}
                    onValueChange={(value) => setNewMessage({ ...newMessage, to: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {isAdmin ? (
                        <>
                          <SelectItem value="all">📢 All Employees (Broadcast)</SelectItem>
                          {users.filter(u => u.role === 'employee').map(user => (
                            <SelectItem key={user.id} value={user.id}>
                              {user.name} - {user.employeeId}
                            </SelectItem>
                          ))}
                        </>
                      ) : (
                        <>
                          <SelectItem value="all">👥 All Supervisors (Broadcast)</SelectItem>
                          {users.filter(u => u.role === 'supervisor' || u.role === 'manager').map(user => (
                            <SelectItem key={user.id} value={user.id}>
                              {user.name} - {user.role === 'supervisor' ? 'Supervisor' : 'Manager'}
                            </SelectItem>
                          ))}
                          {users.filter(u => u.role === 'employee' && u.id !== currentUser.id).map(user => (
                            <SelectItem key={user.id} value={user.id}>
                              {user.name} - {user.employeeId} (Coworker)
                            </SelectItem>
                          ))}
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {isAdmin && (
                <div>
                  <Label>Priority</Label>
                  <Select
                    value={newMessage.priority}
                    onValueChange={(value: Message['priority']) =>
                      setNewMessage({ ...newMessage, priority: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">🔴 High</SelectItem>
                      <SelectItem value="medium">🟡 Medium</SelectItem>
                      <SelectItem value="low">🟢 Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label>Title</Label>
                <Input
                  placeholder={isAdmin ? "Message title..." : "Subject..."}
                  value={newMessage.title}
                  onChange={(e) => setNewMessage({ ...newMessage, title: e.target.value })}
                />
              </div>

              <div>
                <Label>Message</Label>
                <Textarea
                  placeholder={isAdmin ? "Type your message here..." : "Type your message to supervisor or coworkers..."}
                  value={newMessage.content}
                  onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                  rows={5}
                />
              </div>

              {!isAdmin && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
                  <p className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>
                      You can send messages to supervisors for questions, suggestions, or updates. 
                      Messages to coworkers help with team collaboration.
                    </span>
                  </p>
                </div>
              )}

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowCompose(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSendMessage} 
                  className="gap-2 bg-blue-600 hover:bg-blue-700"
                  disabled={!newMessage.title.trim() || !newMessage.content.trim()}
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : null}

        {!isAdmin && (
          <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900 mb-1">How to Use Messages</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Click "New Message" to send messages to supervisors or coworkers</li>
                    <li>• Ask questions, share suggestions, or report issues</li>
                    <li>• View announcements and appreciation from your supervisors</li>
                    <li>• Mark messages as read to keep your inbox organized</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="all">
              All ({userMessages.length})
            </TabsTrigger>
            <TabsTrigger value="appreciation">
              ⭐ Appreciation ({getMessagesByType('appreciation').length})
            </TabsTrigger>
            <TabsTrigger value="announcement">
              📢 Announcements ({getMessagesByType('announcement').length})
            </TabsTrigger>
            <TabsTrigger value="reminder">
              ⏰ Reminders ({getMessagesByType('reminder').length})
            </TabsTrigger>
            <TabsTrigger value="feedback">
              💬 Feedback ({getMessagesByType('feedback').length})
            </TabsTrigger>
          </TabsList>

          {['all', 'appreciation', 'announcement', 'reminder', 'feedback'].map((type) => (
            <TabsContent key={type} value={type}>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {getMessagesByType(type).length === 0 ? (
                    <Card>
                      <CardContent className="py-12 text-center text-muted-foreground">
                        <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No messages in this category</p>
                      </CardContent>
                    </Card>
                  ) : (
                    getMessagesByType(type)
                      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                      .map((message) => (
                        <MessageCard
                          key={message.id}
                          message={message}
                          currentUserId={currentUser.id}
                          onMarkAsRead={onMarkAsRead}
                          getMessageIcon={getMessageIcon}
                        />
                      ))
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}

interface MessageCardProps {
  message: Message;
  currentUserId: string;
  onMarkAsRead: (id: string) => void;
  getMessageIcon: (type: Message['type']) => React.ReactNode;
}

function MessageCard({ message, currentUserId, onMarkAsRead, getMessageIcon }: MessageCardProps) {
  const isUnread = !message.isRead && message.to === currentUserId;
  const isSent = message.from === currentUserId;
  const isReceived = message.to === currentUserId || !message.to;

  return (
    <Card
      className={`${isUnread ? 'ring-2 ring-blue-400 bg-blue-50/50' : ''} ${
        isSent ? 'border-l-4 border-l-green-500' : ''
      } ${isReceived && !isSent ? 'border-l-4 border-l-blue-500' : ''}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
            {getMessageIcon(message.type)}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold">{message.title}</h3>
                  {isSent && (
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-300">
                      Sent
                    </Badge>
                  )}
                  {isUnread && (
                    <Badge variant="destructive" className="text-xs">New</Badge>
                  )}
                  {message.priority === 'high' && (
                    <Badge variant="destructive" className="text-xs">High Priority</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <span>{isSent ? 'To:' : 'From:'} {isSent ? (message.toName || 'Broadcast') : message.fromName}</span>
                  <span>•</span>
                  <span>
                    {new Date(message.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
              {isUnread && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onMarkAsRead(message.id)}
                  className="gap-1"
                >
                  <CheckCheck className="w-4 h-4" />
                  Mark Read
                </Button>
              )}
            </div>
            
            <p className="text-sm text-foreground whitespace-pre-wrap">{message.content}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
