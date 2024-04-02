import request from "@/utils/request";

enum API {
  GET_ANIME_HOME_URL = "/anime/home",
}

export const reqAnimeHome = () => request.get(API.GET_ANIME_HOME_URL);
