export interface TrendingGame {
  game_id: number;
  title: string;
  thumbnail_url: string | null;
  platform: string;
  average_rating: number;
  review_count: number;
}