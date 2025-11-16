🗡️ Solo Leveling — Jinwoo System (Gamified Productivity App)

A gamified self-improvement and task-management system inspired by Sung Jin-Woo’s leveling system from Solo Leveling.
This app turns your real-life habits, tasks, and goals into quests, allows you to earn XP, level up, build streaks, and grow daily — just like a hunter.

🚀 Features
🔥 Core Gameplay

🎯 Create Daily Quests (tasks like workout, coding, meditation, etc.)

⏳ Timed Quests (focus sessions: 25 min, 50 min, etc.)

📈 Leveling System

Complete quests → Earn XP

Level up → Unlock new achievements

🔥 Streak System

Maintain daily discipline

Increase streak multiplier for more XP

🧩 Skill Progression (Hunter Stats)

Your real-life progress translates into stats:

Stat	Meaning
⚔️ Strength	Gym progress, workout levels
🧠 Intelligence	Coding study hours, books
🕊️ Agility	Yoga, flexibility training
❤️ Vitality	Hydration, nutrition, sleep
🎯 Focus	Deep work sessions

Stats increase when related quests are completed.

📚 Modules
✔️ Task System

Create quests

Set priorities

Add sub-tasks

XP rewards

Daily reset system

✔️ User System

Login / signup

JWT auth

User XP, level & stats stored in database

✔️ Analytics Dashboard

XP chart

Daily progress

Completion rate

Streaks visualized

🏗️ Tech Stack
Frontend

React.js

Tailwind CSS

Framer Motion

Zustand / Context API (depending on your setup)

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Auth

Cron jobs for daily reset

⚙️ Cron Jobs (System Automation)

🔄 Reset daily quests at 12 AM

⏫ Recalculate streaks

🧹 Delete expired tasks

🧠 Update XP & stats

📂 Folder Structure
/backend
  ├── controllers
  ├── models
  ├── routes
  ├── config
  ├── utils

/frontend
  ├── src
      ├── components
      ├── pages
      ├── hooks
      ├── context

🧪 API Endpoints
Auth
POST /api/auth/signup
POST /api/auth/login

Tasks
POST   /api/tasks
GET    /api/tasks
PATCH  /api/tasks/:id
DELETE /api/tasks/:id

Stats
GET /api/stats
PATCH /api/stats/update

🏅 Leveling Formula
XP Required = Level * 100


XP earned per task depends on:

Priority

Difficulty

Streak multiplier



🛠️ Setup Instructions
1. Clone the repo
git clone https://github.com/Abhinav6423/your-repo.git

2. Install dependencies (backend)
cd backend
npm install

3. Install dependencies (frontend)
cd frontend
npm install

4. Run the project
npm run dev

❤️ Inspiration

This project is inspired by Solo Leveling and Sung Jin-Woo’s unstoppable drive toward self-improvement.
The goal is simple:

“Become stronger than yesterday.”
