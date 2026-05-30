import { supabase } from './supabase'

export const checkIsFollowing = async (followerId: number, followingId: number): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('follows')
      .select('*')
      .eq('user_id_1', followerId)
      .eq('user_id_2', followingId)
      .single();
    
    return !!data;
  } catch {
    return false;
  }
}

export const followUser = async (followerId: number, followingId: number) => {
  try {
    const { error } = await supabase
      .from('follows')
      .insert([{ user_id_1: followerId, user_id_2: followingId }]);
    return { error: error ? error.message : null };
  } catch (err: any) {
    return { error: err.message };
  }
}

export const unfollowUser = async (followerId: number, followingId: number) => {
  try {
    const { error } = await supabase
      .from('follows')
      .delete()
      .eq('user_id_1', followerId)
      .eq('user_id_2', followingId);
    return { error: error ? error.message : null };
  } catch (err: any) {
    return { error: err.message };
  }
}