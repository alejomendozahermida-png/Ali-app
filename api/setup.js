// Vercel API - Database Setup
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL || 'https://gwfkdkunimthpobdcgod.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3Zmtka3VuaW10aHBvYmRjZ29kIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Nzg3Nzk4OSwiZXhwIjoyMDczNDUzOTg5fQ.D4cTYlL4jK9c8V1W6YlN3xJ2M5P7R9S0T8U2V4W6X8Y0Z';

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Create users table
    const { error: usersError } = await supabase.from('users').select('*').limit(1);
    
    if (usersError && usersError.code === '42P01') {
      // Table doesn't exist, create it
      await supabase.rpc('create_tables', {});
    }

    res.status(200).json({ success: true, message: 'Database ready!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
