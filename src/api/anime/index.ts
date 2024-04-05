import request from "@/utils/request";
import type { ReqSubscribeAnime, ReqAnime, Seed } from "@/types";

enum API {
  GET_ANIME_INFO_URL = "/anime/info",
  SUBSCRIBE_ANIME_URL = "/anime/subscribe",
  GET_SEED_INFO_URL = "/anime/seed",
  GET_SUBGROUP_INFO_URL = "/anime/subgroup",
  GET_TASK_INFO_URL = "/anime/task",
  UPDATE_ANIME_SEED_URL = "/anime/seed/update",
  DELETE_ANIME_SEED_URL = "/anime/seed/delete",
  DOWNLOAD_ANIME_SEED_URL = "/anime/seed/download",
  GET_ANIME_DETAIL_URL = "/anime/detail",
  DELETE_ANIME_TASK_URL = "/anime/task/delete",
  UPDATE_TASK_URL = "/anime/task/update",
}

export const reqAnimeInfo = (mikan_id: number) =>
  request.get(`${API.GET_ANIME_INFO_URL}/${mikan_id}`);
export const reqSubscribeAnime = (data: ReqSubscribeAnime) =>
  request.post(API.SUBSCRIBE_ANIME_URL, data);
export const reqSeedInfo = (mikan_id: number) =>
  request.get(`${API.GET_SEED_INFO_URL}/${mikan_id}`);
export const reqSubgroupInfo = () => request.get(API.GET_SUBGROUP_INFO_URL);
export const reqTaskInfo = (mikan_id: number) =>
  request.get(`${API.GET_TASK_INFO_URL}/${mikan_id}`);
export const reqUpdateAnimeSeed = (data: ReqAnime) =>
  request.post(API.UPDATE_ANIME_SEED_URL, data);
export const reqDeleteAnimeSeed = (data: ReqAnime) =>
  request.post(API.DELETE_ANIME_SEED_URL, data);
export const reqDownloadAnimeSeed = (data: Seed) =>
  request.post(API.DOWNLOAD_ANIME_SEED_URL, data);
export const reqAnimeDetail = (mikan_id: number) =>
  request.get(`${API.GET_ANIME_DETAIL_URL}/${mikan_id}`);
export const reqDeleteAnimeTask = (data: Seed) =>
  request.post(API.DELETE_ANIME_TASK_URL, data);
export const reqUpdateTask = () => request.post(API.UPDATE_TASK_URL);
