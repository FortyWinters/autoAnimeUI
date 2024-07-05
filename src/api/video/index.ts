import type { ReqAnimeTask, ReqSubtitlePath, ReqSubgroupId } from "@/types";
import request from "@/utils/request";

enum API {
  GET_ANIME_TASK_URL = "/video/get_anime_task",
  GET_SUBTITLE_PATH_URL = "/video/get_subtitle_path",
  GET_SUBNAME_PATH_URL = "/video/get_video_subgroup_name",
  POST_RE_GEN_SUB_URL = "/video/extract_subtitle"
}

export const getAnimeTask = (torrent_name: ReqAnimeTask) => request.post(API.GET_ANIME_TASK_URL, torrent_name);
export const getSubtitlePath = (video_name: ReqSubtitlePath) => request.post(API.GET_SUBTITLE_PATH_URL, video_name);
export const postReGenSubtitle = (torrent_name: ReqAnimeTask) => request.post(API.POST_RE_GEN_SUB_URL, torrent_name);