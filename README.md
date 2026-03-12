# Ali - Mental Health Companion App

A beautiful mental health app built with HTML/Tailwind CSS.

## Features

- **AI Companion Chat** - Talk to an AI companion anytime
- **Mood Tracking** - Daily mood check-ins
- **Meditation Library** - Guided meditation sessions
- **Daily Exercises** - Emotional awareness exercises
- **Community** - Connect with others
- **Progress Tracking** - Streaks, points, badges
- **Profile Management** - User settings and preferences

## Tech Stack

- **Frontend**: HTML5, Tailwind CSS, Vanilla JavaScript
- **Backend**: Node.js + Express (in `/backend`)
- **Database**: Supabase (ready to connect)
- **AI**: OpenAI integration ready

## Quick Start (Frontend Only)

1. Open `index.html` in a browser
2. Or serve locally:
   ```bash
   cd ali_app
   python -m http.server 8080
   ```
3. Access at `http://localhost:8080`

## Backend Setup (Optional)

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Configure environment:
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

3. Start server:
   ```bash
   npm start
   ```

## Supabase Setup (Optional)

1. Create project at [supabase.com](https://supabase.com)
2. Get URL and anon key
3. Update `backend/supabase.js` with credentials
4. Run SQL in Supabase dashboard

## Access on Mobile

1. Find your local IP: `ipconfig` (Windows)
2. Start server: `python -m http.server 8080`
3. Visit: `http://YOUR_IP:8080`

## File Structure

```
ali_app/
├── index.html          # Main app
├── README.md           # This file
├── pubspec.yaml        # Flutter config (optional)
└── backend/
    ├── server.js       # Express API server
    ├── supabase.js     # Supabase config
    └── package.json    # Node dependencies
```

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/user` - Create user
- `GET /api/user/:id` - Get user
- `POST /api/mood` - Log mood
- `GET /api/mood/:userId` - Get mood logs
- `GET /api/streak/:userId` - Get streak
- `POST /api/chat` - Send message
- `GET /api/chat/:userId` - Get chat history

## License

MIT
