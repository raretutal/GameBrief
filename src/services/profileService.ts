// handle fetching the user's base information, counting their followers/following, and calculating review statistics.

// src/services/profileService.ts
import { supabase } from './supabase'
import type { UserProfileData } from '../interfaces/UserProfileData'

export const getUserProfile = async (userId: number): Promise<{ data: UserProfileData | null; error: string | null }> => {
  try {
    // 1. Fetch the base user information
    const { data: userData, error: userError } = await supabase
      .from('User')
      .select('username, profile_bio, image_url')
      .eq('user_id', userId)
      .single()

    if (userError) throw userError

    // 2. Fetch the number of followers (where user_id_2 is the current user)
    const { count: followersCount, error: followersError } = await supabase
      .from('follows')
      .select('*', { count: 'exact', head: true })
      .eq('user_id_2', userId)

    if (followersError) throw followersError

    // 3. Fetch the number of people the user is following (where user_id_1 is the current user)
    const { count: followingCount, error: followingError } = await supabase
      .from('follows')
      .select('*', { count: 'exact', head: true })
      .eq('user_id_1', userId)

    if (followingError) throw followingError

    // 4. Fetch the user's reviews to calculate stats
    const { data: reviewsData, error: reviewsError } = await supabase
      .from('review')
      .select('game_id, star_rating')
      .eq('user_id', userId)

    if (reviewsError) throw reviewsError

    let reviewCount = 0
    let gameCount = 0
    let avgRating = 0

    // Calculate aggregated statistics from the reviews
    if (reviewsData && reviewsData.length > 0) {
      reviewCount = reviewsData.length
      
      // Use a Set to extract only the unique games the user has reviewed
      const uniqueGames = new Set(reviewsData.map(r => r.game_id))
      gameCount = uniqueGames.size

      // Calculate the average star rating
      const totalRating = reviewsData.reduce((sum, r) => sum + (r.star_rating || 0), 0)
      avgRating = Number((totalRating / reviewCount).toFixed(1))
    }

    // Map the database response to our interface
    const profileData: UserProfileData = {
      username: userData.username,
      bio: userData.profile_bio || 'No bio provided.',
      avatarUrl: userData.image_url || 'https://via.placeholder.com/150',
      followers: followersCount || 0,
      following: followingCount || 0,
      reviewCount,
      gameCount,
      avgRating
    }

    return { data: profileData, error: null }
  } catch (err: any) {
    return { data: null, error: err.message || 'Failed to fetch profile data.' }
  }
}

// to allow userrs to update their profile
export const updateUserProfile = async (userId: number, username: string, bio: string, imageUrl: string): Promise<{ error: string | null }> => {
  try {
    const { error } = await supabase
      .from('User')
      .update({
        username: username,
        profile_bio: bio,
        image_url: imageUrl
      })
      .eq('user_id', userId);

    return { error: error ? error.message : null };
  } catch (err: any) {
    return { error: err.message || 'An unexpected error occurred.' };
  }
}