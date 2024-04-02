export interface Anime {
  anime_name: string;
  anime_type: number;
  id: number;
  img_url: string;
  mikan_id: number;
  subscribe_status: number;
  update_day: number;
}

export type Animes = Anime[];

export interface ReqSubscribeAnime {
  mikan_id: number;
  subscribe_status: number;
}