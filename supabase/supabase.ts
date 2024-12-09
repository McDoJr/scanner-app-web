// src/supabase.js
import { createClient } from '@supabase/supabase-js'

// Replace with your own URL and anon key from the Supabase dashboard
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_API_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: localStorage, // Ensure you set this properly
        autoRefreshToken: true,
        persistSession: true,
    },
});