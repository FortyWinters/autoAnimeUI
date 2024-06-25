import request from "@/utils/request";

enum API {
  GET_ANIME_HOME_URL = "/anime/home",
  SEARCH_ANIME_URL = "/anime/search",
}

export const reqAnimeHome = () => request.get(API.GET_ANIME_HOME_URL);
export const reqSearchAnime = (keyword: string) =>
  request.get(`${API.SEARCH_ANIME_URL}/${keyword}`);
