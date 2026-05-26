import { createClient } from '@supabase/supabase-js'

// Vite exposes environment variables via import.meta.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Safety check to ensure variables are defined during development
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables in .env file')
}

// Create and export a single, reusable Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey)  