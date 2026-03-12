// Supabase Configuration
const SUPABASE_URL = 'https://gwfkdkunimthpobdcgod.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3Zmtka3VuaW10aHBvYmRjZ29kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4Nzc5ODksImV4cCI6MjA3MzQ1Mzk4OX0.I7InU-suAH_qaTersYRM7tpUwi70Gax49DOJnaz5JVo';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Database tables will be created in Supabase dashboard
