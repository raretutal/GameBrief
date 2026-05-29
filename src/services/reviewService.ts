import { supabase } from './supabase'
import type { Review } from '../interfaces/Review'
import type { UserReview } from '../interfaces/UserReview'

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

// Fetch reviews for a specific user and join the Game table for the title
export const getReviewsByUserId = async (userId: number): Promise<{ data: UserReview[] | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('review')
      .select(`
        *,
        game (
          title
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    const formattedData: UserReview[] = data.map((item: any) => ({
      user_id: item.user_id,
      game_id: item.game_id,
      created_at: item.created_at,
      star_rating: item.star_rating,
      comment_text: item.comment_text,
      game_title: item.game?.title || 'Unknown Game'
    }));

    return { data: formattedData, error: null };
  } catch (err: any) {
    return { data: null, error: err.message || 'An unexpected error occurred.' };
  }
}

// Update an existing review based on its composite primary key
export const updateReview = async (userId: number, gameId: number, createdAt: string, starRating: number, commentText: string) => {
  try {
    const { error } = await supabase
      .from('review')
      .update({ star_rating: starRating, comment_text: commentText })
      .eq('user_id', userId)
      .eq('game_id', gameId)
      .eq('created_at', createdAt);
      
    return { error: error ? error.message : null };
  } catch (err: any) {
    return { error: err.message };
  }
}

// Delete an existing review based on its composite primary key
export const deleteReview = async (userId: number, gameId: number, createdAt: string) => {
  try {
    const { error } = await supabase
      .from('review')
      .delete()
      .eq('user_id', userId)
      .eq('game_id', gameId)
      .eq('created_at', createdAt);
      
    return { error: error ? error.message : null };
  } catch (err: any) {
    return { error: err.message };
  }
}