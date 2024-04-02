import request from "@/utils/request";
import type { ReqSubscribeAnime } from "@/types";

enum API {
  GET_ANIME_INFO_URL = "/anime/info",
  SUBSCRIBE_ANIME_URL = "/anime/subscribe",
}

export const reqAnimeInfo = (mikan_id: number) =>
  request.get(`${API.GET_ANIME_INFO_URL}/${mikan_id}`);
export const reqSubscribeAnime = (data: ReqSubscribeAnime) =>
  request.post(API.SUBSCRIBE_ANIME_URL, data);
