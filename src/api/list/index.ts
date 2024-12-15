import request from "@/utils/request";
import type { AnimeBroadcastReqJson } from "@/types";

enum API {
  GET_ANIME_BROADCAST_URL = "/anime/broadcast",
  UPDATE_ANIME_BROADCAST_URL = "/anime/broadcast/update",
}

export const reqAnimeBroadcast = (data: AnimeBroadcastReqJson) =>
  request.post(API.GET_ANIME_BROADCAST_URL, data);
export const reqUpdateAnimeBroadcast = (data: AnimeBroadcastReqJson) =>
  request.post(API.UPDATE_ANIME_BROADCAST_URL, data);
