import request from "@/utils/request";
import type { ReqAnimeBroadcast } from "@/types";

enum API {
  GET_ANIME_BROADCAST_URL = "/anime/broadcast",
  UPDATE_ANIME_BROADCAST_URL = "/anime/broadcast/update",
}

export const reqAnimeBroadcast = (data: ReqAnimeBroadcast) =>
  request.get(`${API.GET_ANIME_BROADCAST_URL}/${data.year}/${data.season}`);
export const reqUpdateAnimeBroadcast = (data: ReqAnimeBroadcast) =>
  request.post(API.UPDATE_ANIME_BROADCAST_URL, data);
