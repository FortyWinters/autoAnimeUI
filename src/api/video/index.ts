import type { ReqAnimeTask, ReqSubtitlePath, ReqSubgroupId } from "@/types";
import request from "@/utils/request";

enum API {
  GET_VIDEO_DETAIL = "/video/get_video_detail",
  POST_RE_GEN_SUB_URL = "/video/extract_subtitle"
}

export const getVideoDetail = (torrent_name: ReqAnimeTask) => request.post(API.GET_VIDEO_DETAIL, torrent_name);
export const postReGenSubtitle = (torrent_name: ReqAnimeTask) => request.post(API.POST_RE_GEN_SUB_URL, torrent_name);