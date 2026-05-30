export interface SearchResult {
  game_id: number;
  title: string;
  thumbnail_url: string | null;
  belongsto: { genre_name: string }[];
}