import { supabase } from './supabase'
import type { Game } from '../interfaces/Game'

export const getAllGames = async (): Promise<{ data: Game[] | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('game')
      .select('*')

    if (error) {
      return { data: null, error: error.message }
    }

    return { data: data as Game[], error: null }
  } catch (err: any) {
    return { data: null, error: err.message || 'An unexpected error occurred.' }
  }
}