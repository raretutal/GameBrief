// for search results in search bar in home page

import { supabase } from './supabase'
import type { SearchResult } from '../interfaces/SearchResult'

export const getGenres = async (): Promise<{ data: any[] | null; error: string | null }> => {
  try {
    const { data, error } = await supabase.from('genre').select('genre_name');
    return { data, error: error ? error.message : null };
  } catch (err: any) {
    return { data: null, error: err.message };
  }
}

export const searchGames = async (queryStr: string, genre: string): Promise<{ data: SearchResult[] | null; error: string | null }> => {
  try {
    // If a genre is selected, enforce an inner join so it strictly filters out games without that genre
    const relation = genre ? 'belongsto!inner(genre_name)' : 'belongsto(genre_name)';
    
    let query = supabase.from('game').select(`
      game_id,
      title,
      thumbnail_url,
      ${relation}
    `);

    if (queryStr) {
      query = query.ilike('title', `%${queryStr}%`);
    }

    if (genre) {
      query = query.eq('belongsto.genre_name', genre);
    }

    const { data, error } = await query.limit(8);

    if (error) throw error;
    
    return { data: data as SearchResult[], error: null };
  } catch (err: any) {
    return { data: null, error: err.message };
  }
}