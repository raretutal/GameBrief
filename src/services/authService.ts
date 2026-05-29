
import { supabase } from './supabase'
import type { User } from '../interfaces/User'

export const signIn = async (email: string, password: string): Promise<{ user: User | null; error: string | null }> => {
  try {
    // Queries the custom 'User' table. 
    // Note: This directly compares the input password to the stored password_hash for now.
    const { data, error } = await supabase
      .from('User')
      .select('*')
      .eq('email', email)
      .eq('password_hash', password)
      .single()

    if (error) {
      return { user: null, error: 'Invalid email or password.' }
    }

    return { user: data as User, error: null }
  } catch (err: any) {
    return { user: null, error: err.message || 'An unexpected error occurred.' }
  }
}