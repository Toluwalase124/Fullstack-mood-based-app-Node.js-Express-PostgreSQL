# 🎭 MoodCast

> A full-stack, production-grade web application that matches your mood to weather, music, and motivation — built from scratch as a personal learning project.

![Status](https://img.shields.io/badge/Status-In%20Progress-blue)
![Phase](https://img.shields.io/badge/Phase-3%20of%205-orange)
![Node](https://img.shields.io/badge/Node.js-v20-green)
![Express](https://img.shields.io/badge/Express-v5-lightgrey)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)

---

## 📖 What Is MoodCast?

MoodCast is a web app where users:

- Select their current mood (happy, sad, focused, anxious, angry)
- Get a real-time weather snapshot for their city
- Receive a curated playlist suggestion matched to their mood
- Get a motivational quote to go with it
- Have all mood entries saved and retrievable from a database

---

## 🏗️ Tech Stack

| Layer | Technology | Status |
|---|---|---|
| **Frontend** | Next.js (React) 
| **Backend** | Node.js + Express 
| **Database** | PostgreSQL 
| **Weather API** | Open-Meteo | Free, no key needed |
| **Quotes API** | ZenQuotes | Free, no key needed |
| **Dev Environment** | WSL (Ubuntu on Windows) 

---

## 🗺️ Project Phases

```
✅ Phase 1 — API Fundamentals       (REST, HTTP, JSON, external API calls)
✅ Phase 2 — Express REST API        (6 endpoints, server.js, middleware)
✅ Phase 3 — PostgreSQL Database     (moods table, save & retrieve data)
⏭️ Phase 4 — Next.js Frontend       (UI, mood selector, API integration)
⬜ Phase 5 — Deploy + Domain         (Vercel, Railway, custom domain)
```

---

## 📁 Project Structure

```
moodcast/
└── backend/
    ├── node_modules/       ← installed packages 
    ├── .env                ← environment variables 
    ├── .gitignore
    ├── db.js               ← PostgreSQL connection pool
    ├── package.json        ← project dependencies
    ├── package-lock.json
    └── server.js           ← Express REST API server
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v20+
- PostgreSQL 16+
- WSL 
### 1. Clone the repository

```bash
git clone https://github.com/Toluwalase124/Fullstack-mood-based-app-Node.js-Express-PostgreSQL.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the `backend` folder

### 4. Set up the database

```bash
# Enter PostgreSQL as admin
sudo -u postgres psql

# Run these commands:
CREATE USER moodcast_user WITH PASSWORD 'your_password';
CREATE DATABASE moodcast;
GRANT ALL PRIVILEGES ON DATABASE moodcast TO moodcast_user;
\q

# Connect to the moodcast database
sudo -u postgres psql -d moodcast

# Create the moods table
CREATE TABLE moods (
  id          SERIAL PRIMARY KEY,
  mood        VARCHAR(50) NOT NULL,
  emoji       VARCHAR(10),
  message     TEXT,
  playlist    VARCHAR(100),
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

# Grant table permissions
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO moodcast_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO moodcast_user;
\q
```

### 5. Start the server

```bash
npm run dev
```

You should see:

```
✅ Connected to PostgreSQL database
🚀 MoodCast API running at http://localhost:5000
```

---

## 📡 API Endpoints

### Health Check
```
GET /api/health
```
```json
{
  "status": "ok",
  "message": "MoodCast API is running",
  "timestamp": "2026-03-21T10:00:00.000Z"
}
```

---

### Get a Joke
```
GET /api/joke/:category
```
Categories: `Programming`, `Misc`, `Pun`, `Christmas`

```json
{
  "success": true,
  "category": "Programming",
  "joke": "Why do programmers prefer dark mode? Because light attracts bugs."
}
```

---

### Get a Motivational Quote
```
GET /api/quote
```
```json
{
  "success": true,
  "quote": "Never waste a minute of your precious life thinking about people you don't like.",
  "author": "Celestine Chua"
}
```

---

### Get Mood Response
```
GET /api/mood/:mood
```
Available moods: `happy`, `sad`, `focused`, `anxious`, `angry`

```json
{
  "success": true,
  "mood": "happy",
  "emoji": "😄",
  "message": "Keep that energy!",
  "playlist": "Good Vibes"
}
```

---

### Save a Mood to Database
```
POST /api/mood/save
Content-Type: application/json
```
```json
{
  "mood": "happy",
  "emoji": "😄",
  "message": "Keep that energy!",
  "playlist": "Good Vibes"
}
```
Response:
```json
{
  "success": true,
  "message": "Mood saved to database",
  "data": {
    "id": 1,
    "mood": "happy",
    "emoji": "😄",
    "message": "Keep that energy!",
    "playlist": "Good Vibes",
    "created_at": "2026-03-21T10:37:57.730Z"
  }
}
```

---

### Get All Saved Moods
```
GET /api/moods
```
```json
{
  "success": true,
  "count": 7,
  "data": [
    {
      "id": 7,
      "mood": "sad",
      "emoji": "😢",
      "message": "This too shall pass.",
      "playlist": "Healing Sounds",
      "created_at": "2026-03-21T10:53:22.018Z"
    }
  ]
}
```

---

## 🧠 Key Concepts Learned

| Concept | Description |
|---|---|
| REST API | A style of API using URLs + HTTP methods + JSON |
| Express | Node.js framework for building REST APIs |
| Middleware | Code that runs on every request before endpoints |
| async/await | How JavaScript handles waiting for responses |
| try/catch | Prevents server crashes when APIs fail |
| .env file | Keeps secrets off GitHub and out of code |
| PostgreSQL Pool | Manages multiple DB connections efficiently |
| SERIAL | Auto-incrementing integer for database IDs |

---

## 🔒 Security Notes

- API keys and database credentials are stored in `.env` only
- `.env` is listed in `.gitignore` and never committed to GitHub
- `node_modules` is excluded from Git — run `npm install` to restore
- CORS is configured to allow only trusted origins in production

---

## 📸 Progress Screenshots

> Screenshots from each phase are documented in the project build log.

- ✅ WSL terminal — project folder creation and npm init
- ✅ npm install — all packages installed, 0 vulnerabilities
- ✅ server.js — nodemon running, all 4 endpoints listed
- ✅ curl tests — all endpoints returning correct JSON
- ✅ Browser — JSON responses visible with JSON Formatter extension
- ✅ PostgreSQL — moods saved and retrieved, count: 7

---

---

## 👤 Author

**Tolu** — building in public, documenting every phase.

> *"Built from scratch. Documented every step. Deploying to production."*

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
