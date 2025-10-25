🧠 Optiwork — Manufacturing Task Management App

Optiwork is a web-based task management system designed to streamline manufacturing workflows.
Built with React + TypeScript + Vite, it provides an efficient, fast, and responsive interface for managing production tasks, tracking progress, and improving operational visibility.

🚀 Features

📋 Task Management — Create, assign, and track manufacturing tasks easily.

🏭 Production Overview — Real-time insights into ongoing operations.

🔔 Notifications — Stay informed about task progress and updates.

📊 Analytics Dashboard — Visualize production efficiency and performance.

🧩 Modular Design — Easy to extend and customize.

🛠️ Tech Stack
Category	Technologies
Frontend	React, TypeScript, Vite
Styling	Tailwind CSS
Version Control	Git & GitHub
Deployment	GitHub Pages
⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/KAMESH101/Optiwork.git
cd Optiwork

2️⃣ Install Dependencies
npm install

3️⃣ Run the Development Server
npm run dev


Your app will be available at http://localhost:5173/

4️⃣ Build for Production
npm run build


The build output will be in the dist/ or build/ folder.

5️⃣ Deploy to GitHub Pages

Your site is automatically deployed by GitHub Actions to:
👉 https://kamesh101.github.io/Optiwork/

🧾 Folder Structure
Optiwork/
│
├── src/                # Application source code
├── public/             # Static assets
├── .github/workflows/  # GitHub Actions for Pages deployment
├── package.json        # Dependencies and scripts
├── vite.config.ts      # Vite configuration
└── README.md           # Project documentation

🧑‍💻 Development Scripts
Command	Description
npm run dev	Start the local dev server
npm run build	Build the project for production
npm run preview	Preview the production build locally
🌐 Deployment Workflow

This project uses GitHub Actions (.github/workflows/gh-pages.yml) to build and deploy automatically whenever you push to the main branch.
