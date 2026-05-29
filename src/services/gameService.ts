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

export const getGameById = async (id: number): Promise<{ data: any | null; error: string | null }> => {
  try {
    // 1. Fetch the main game data
    const { data: gameData, error: gameError } = await supabase
      .from('game')
      .select('*')
      .eq('game_id', id)
      .single()

    if (gameError) throw gameError

    // 2. Fetch the developer linked to this game
    let developerName = 'Unknown Developer'
    
    const { data: createsData } = await supabase
      .from('creates')
      .select('dev_id')
      .eq('game_id', id)
      .limit(1)

    // Safely extract the first element using optional chaining.
    // If createsData is null or empty, firstCreate becomes undefined.
    const firstCreate = createsData?.[0]

    // Verify both the object and the dev_id property exist before executing the next query.
    if (firstCreate && firstCreate.dev_id) {
      const { data: devData } = await supabase
        .from('developer')
        .select('company_name')
        .eq('dev_id', firstCreate.dev_id)
        .single()
        
      if (devData) {
        developerName = devData.company_name
      }
    }

    return { 
      data: { ...gameData, developerName }, 
      error: null 
    }
  } catch (err: any) {
    return { data: null, error: err.message || 'An unexpected error occurred.' }
  }
}