export interface UserReview {
  user_id: number;
  game_id: number;
  created_at: string;
  star_rating: number;
  comment_text: string | null;
  // Joined from the Game table
  game_title: string; 
}