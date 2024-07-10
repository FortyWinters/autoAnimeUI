import type { ReqAnimeTask, ReqVideoProgress } from "@/types";
import request from "@/utils/request";

enum API {
  GET_VIDEO_DETAIL = "/video/get_video_detail",
  POST_RE_GEN_SUB_URL = "/video/extract_subtitle",
  GET_VIDEO_PROGRESS_URL = "/video/get_anime_progress",
  SET_VIDEO_PROGRESS_URL = "/video/set_anime_progress"
}

export const getVideoDetail = (torrent_name: ReqAnimeTask) => request.post(API.GET_VIDEO_DETAIL, torrent_name);
export const postReGenSubtitle = (torrent_name: ReqAnimeTask) => request.post(API.POST_RE_GEN_SUB_URL, torrent_name);
export const setVideoProgress = (req_video_progress: ReqVideoProgress) => request.post(API.SET_VIDEO_PROGRESS_URL, req_video_progress);
export const getVideoProgress = (req_video_progress: ReqVideoProgress) => request.post(API.GET_VIDEO_PROGRESS_URL, req_video_progress);