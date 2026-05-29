import { supabase } from './supabase'
import type { Review } from '../interfaces/Review'

export const getReviewsByGameId = async (gameId: number): Promise<{ data: Review[] | null; error: string | null }> => {
  try {
    // We select the review data and join the User table using the foreign key
    const { data, error } = await supabase
      .from('review')
      .select(`
        *,
        User (
          username,
          image_url
        )
      `)
      .eq('game_id', gameId)
      .order('created_at', { ascending: false });

    if (error) {
      return { data: null, error: error.message };
    }

    // Flatten the nested User object so it matches our Review interface
    const formattedData: Review[] = data.map((item: any) => ({
      user_id: item.user_id,
      game_id: item.game_id,
      created_at: item.created_at,
      star_rating: item.star_rating,
      comment_text: item.comment_text,
      username: item.User?.username || 'Unknown User',
      user_image: item.User?.image_url || null
    }));

    return { data: formattedData, error: null };
  } catch (err: any) {
    return { data: null, error: err.message || 'An unexpected error occurred.' };
  }
}