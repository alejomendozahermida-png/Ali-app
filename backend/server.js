// Ali App Backend Server
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-memory data store (replace with Supabase in production)
const users = new Map();
const moodLogs = [];
const chatMessages = [];
const meditationSessions = [];
const achievements = [];
const streaks = new Map();

// Initialize default user
streaks.set('default-user', { current: 12, longest: 15, points: 47 });

// ==================== ROUTES ====================

// User routes
app.post('/api/user', (req, res) => {
  const { email, name } = req.body;
  const userId = 'default-user';
  users.set(userId, { email, name, createdAt: new Date() });
  res.json({ success: true, userId });
});

app.get('/api/user/:id', (req, res) => {
  const user = users.get(req.params.id);
  res.json(user || { name: 'Alejandro', email: 'alejandro@email.com' });
});

// Mood routes
app.post('/api/mood', (req, res) => {
  const { userId, mood, note } = req.body;
  const log = { id: moodLogs.length + 1, userId, mood, note, createdAt: new Date() };
  moodLogs.push(log);
  
  // Update streak
  const streak = streaks.get(userId) || { current: 0, longest: 0, points: 0 };
  streak.current += 1;
  streak.points += 5;
  if (streak.current > streak.longest) streak.longest = streak.current;
  streaks.set(userId, streak);
  
  res.json({ success: true, log, streak });
});

app.get('/api/mood/:userId', (req, res) => {
  const userMoodLogs = moodLogs.filter(m => m.userId === req.params.userId);
  res.json(userMoodLogs);
});

// Streak routes
app.get('/api/streak/:userId', (req, res) => {
  const streak = streaks.get(req.params.userId) || { current: 12, longest: 15, points: 47 };
  res.json(streak);
});

// Chat routes (AI responses)
app.post('/api/chat', async (req, res) => {
  const { userId, message } = req.body;
  
  // Save user message
  chatMessages.push({ id: chatMessages.length + 1, userId, message, isAi: false, createdAt: new Date() });
  
  // Generate AI response (simple rule-based for now)
  const aiResponses = [
    "I understand how you feel. Would you like to explore that further?",
    "That's a valid concern. Many people experience similar feelings.",
    "I'm here to support you. What would help you feel better?",
    "Taking time to reflect shows self-awareness. That's great.",
    "Remember, it's okay to not be okay. I'm here to listen.",
    "What coping strategies have worked for you in the past?",
    "I appreciate you sharing this with me. How long have you felt this way?",
    "Your feelings are important. Let's work through this together."
  ];
  
  const aiMessage = aiResponses[Math.floor(Math.random() * aiResponses.length)];
  
  chatMessages.push({ id: chatMessages.length + 1, userId, message: aiMessage, isAi: true, createdAt: new Date() });
  
  res.json({ success: true, response: aiMessage });
});

app.get('/api/chat/:userId', (req, res) => {
  const userMessages = chatMessages.filter(m => m.userId === req.params.userId);
  res.json(userMessages);
});

// Meditation routes
app.post('/api/meditation', (req, res) => {
  const { userId, meditationId, durationMinutes, completed } = req.body;
  const session = { id: meditationSessions.length + 1, userId, meditationId, durationMinutes, completed, createdAt: new Date() };
  meditationSessions.push(session);
  
  if (completed) {
    const streak = streaks.get(userId) || { current: 0, longest: 0, points: 0 };
    streak.points += 10;
    streaks.set(userId, streak);
  }
  
  res.json({ success: true, session });
});

app.get('/api/meditation/:userId', (req, res) => {
  const userSessions = meditationSessions.filter(m => m.userId === req.params.userId);
  res.json(userSessions);
});

// Achievements routes
app.get('/api/achievements/:userId', (req, res) => {
  const userAchievements = [
    { id: 1, badge: '7-day', name: '7 Day Streak', earned: true },
    { id: 2, badge: 'meditate', name: 'First Meditation', earned: true },
    { id: 3, badge: 'chat', name: 'First Chat', earned: true },
    { id: 4, badge: 'star', name: 'Top Contributor', earned: true },
    { id: 5, badge: '30-day', name: '30 Day Streak', earned: false },
    { id: 6, badge: 'zen', name: 'Zen Master', earned: false }
  ];
  res.json(userAchievements);
});

// Stats summary
app.get('/api/stats/:userId', (req, res) => {
  const streak = streaks.get(req.params.userId) || { current: 12, longest: 15, points: 47 };
  const totalMeditations = meditationSessions.filter(m => m.userId === req.params.userId && m.completed).length;
  const totalChats = chatMessages.filter(m => m.userId === req.params.userId && !m.isAi).length;
  
  res.json({
    streak: streak.current,
    longestStreak: streak.longest,
    points: streak.points,
    totalMeditations,
    totalChats,
    badges: 3
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`Ali App Backend running on http://localhost:${PORT}`);
});
