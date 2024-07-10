export interface Anime {
  anime_name: string;
  anime_type: number;
  id: number;
  img_url: string;
  mikan_id: number;
  subscribe_status: number;
  update_day: number;
  bangumi_id: number;
  bangumi_rank: string;
  bangumi_summary: string;
  website: string;
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
  progress?: number;
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

export interface qbTask {
  torrent_name: string;
  progress: string;
}

export type qbTasks = Task[];

export interface ReqAnimeTask {
  torrent_name: string;
}

export interface ReqSubtitlePath {
  video_name: string;
}
export interface ReqSubgroupId {
  id: number;
}

export interface qbConfig {
  qb_url: string,
  username: string,
  password: string
}
export interface ReqCongfig {
  deploy_mode: string,
  download_path: string,
  img_path: string,
  ui_url: string,
  qb_config: qbConfig
}

export interface ReqVideoProgress {
  progress_id: string,
  torrent_name: string,
  progress_status: number
}