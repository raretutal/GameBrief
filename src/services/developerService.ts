// fetching all Developers' data
import { supabase } from './supabase'
import type { Developer } from '../interfaces/Developer'

export const getAllDevelopers = async (): Promise<{ data: Developer[] | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('developer')
      .select('*')

    if (error) {
      return { data: null, error: error.message }
    }

    return { data: data as Developer[], error: null }
  } catch (err: any) {
    return { data: null, error: err.message || 'An unexpected error occurred.' }
  }
}