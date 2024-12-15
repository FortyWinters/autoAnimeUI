import request from "@/utils/request";
import type { AnimeKeyWordReqJson } from "@/types";

enum API {
  GET_ANIME_HOME_URL = "/anime/home",
  SEARCH_ANIME_URL = "/anime/search",
}

export const reqAnimeHome = () => request.get(API.GET_ANIME_HOME_URL);
export const reqSearchAnime = (data: AnimeKeyWordReqJson) =>
  request.post(API.SEARCH_ANIME_URL, data);
