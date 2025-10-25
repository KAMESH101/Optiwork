import { CheckCircle2, Zap } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

interface TaskSyncIndicatorProps {
  show: boolean;
  taskTitle: string;
  employeeName: string;
}

export function TaskSyncIndicator({ show, taskTitle, employeeName }: TaskSyncIndicatorProps) {
  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
      <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-industrial-lg border-none">
        <CardContent className="p-4 flex items-start gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold">Task Synced!</h4>
              <Zap className="w-4 h-4 animate-pulse" />
            </div>
            <p className="text-sm text-white/90 mb-1">
              <strong>"{taskTitle}"</strong>
            </p>
            <p className="text-xs text-white/75">
              Assigned to {employeeName} • Now visible in employee portal
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
