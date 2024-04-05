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

export interface ReqAnimeBroadcast {
  year: number;
  season: number;
}

export interface Seed {
  mikan_id: number;
  subgroup_id: number;
  episode: number;
  seed_name: string;
  seed_url: string;
  seed_status: number;
  seed_size: string;
}
// 0: unused
// 1: used
export type Seeds = Seed[];

export interface Subgroup {
  subgroup_id: number;
  subgroup_name: string;
}

export type Subgroups = Subgroup[];

export interface Task {
  id: number;
  mikan_id: number;
  episode: number;
  torrent_name: string;
  qb_task_status: number;
}
// 0: downloading
// 1: done
export type Tasks = Task[];

export interface ReqAnime {
  mikan_id: number;
}

export interface AnimeDetail {
  anime_info: Anime;
  seed_info: Seeds;
  subgroup_indo: Subgroups;
  task_info: Tasks;
}
