// Supabase Configuration for Ali App
// https://supabase.com

const supabaseConfig = {
  // TODO: Replace with your actual Supabase credentials when ready
  supabaseUrl: 'https://sb-secret-1wqzmxdoktsvrgk-jzuk4g-9n0w3iuq.supabase.co',
  supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNiLXNlY3JldC0xd3F6bXhkb2t0c3ZyZ2stanZ1azRnLTluM3dpcXEiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MjU0NjM2MywiZXhwIjoxOTU4MTIyMzYzfQ.Vx6z0RrGz0V8BqYzBqYJ-T8pMjQjB8jCvVhJgSpqZZI',
  
  // Tables to create in Supabase:
  tables: {
    users: `
      -- Users table
      CREATE TABLE users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        email TEXT UNIQUE NOT NULL,
        name TEXT,
        avatar_url TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `,
    
    mood_logs: `
      -- Mood tracking
      CREATE TABLE mood_logs (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID REFERENCES users(id),
        mood TEXT NOT NULL, -- great, good, okay, bad, awful
        note TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `,
    
    chat_messages: `
      -- Chat history
      CREATE TABLE chat_messages (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID REFERENCES users(id),
        message TEXT NOT NULL,
        is_ai BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `,
    
    meditation_sessions: `
      -- Meditation progress
      CREATE TABLE meditation_sessions (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID REFERENCES users(id),
        meditation_id TEXT NOT NULL,
        duration_minutes INTEGER,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `,
    
    achievements: `
      -- User achievements/badges
      CREATE TABLE achievements (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID REFERENCES users(id),
        badge_id TEXT NOT NULL,
        earned_at TIMESTAMP DEFAULT NOW()
      );
    `,
    
    streaks: `
      -- Daily streaks
      CREATE TABLE streaks (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID REFERENCES users(id),
        current_streak INTEGER DEFAULT 0,
        longest_streak INTEGER DEFAULT 0,
        last_activity_date DATE,
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `
  },
  
  // Row Level Security (RLS) policies
  rlsPolicies: `
    -- Enable RLS
    ALTER TABLE users ENABLE ROW LEVEL SECURITY;
    ALTER TABLE mood_logs ENABLE ROW LEVEL SECURITY;
    ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
    ALTER TABLE meditation_sessions ENABLE ROW LEVEL SECURITY;
    ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
    ALTER TABLE streaks ENABLE ROW LEVEL SECURITY;
    
    -- Users can only access their own data
    CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid() = id);
    CREATE POLICY "Users can insert own data" ON users FOR INSERT WITH CHECK (auth.uid() = id);
    CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);
  `
};

module.exports = supabaseConfig;
