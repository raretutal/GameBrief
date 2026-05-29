export interface Game {
  game_id: number;
  title: string;
  thumbnail_url: string | null;
  video_url: string | null;
  description: string | null;
  age_rating: string | null;
  pricing_model: string | null;
  actual_price: number | null;
}