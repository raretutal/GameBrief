
export interface Review {
  user_id: number;
  game_id: number;
  created_at: string;
  star_rating: number;
  comment_text: string | null;
  // Joined fields from the User table
  username: string;
  user_image: string | null;
}