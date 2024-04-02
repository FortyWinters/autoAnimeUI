import request from "@/utils/request";

enum API {
  GET_ANIME_INFO = "/anime/info",
}

export const reqAnimeInfo = (mikan_id: number) =>
  request.get(`${API.GET_ANIME_INFO}/${mikan_id}`);
