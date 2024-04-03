import request from "@/utils/request";

enum API {
  GET_ANIME_BROADCAST_URL = "/anime/broadcast",
}

export const reqAnimeBroadcast = (year: number, season: number) => request.get(`${API.GET_ANIME_BROADCAST_URL}/${year}/${season}`);
