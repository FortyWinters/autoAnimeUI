import request from "@/utils/request";

enum API {
  HOME_ANIME_URL = "/anime/home",
}

export const reqHomeAnime = () => request.get(API.HOME_ANIME_URL);
