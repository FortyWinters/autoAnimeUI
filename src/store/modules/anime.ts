import { defineStore } from "pinia";
import { reqAnimeInfo, reqSubscribeAnime } from "@/api/anime";
import type { Anime } from "@/types";
import { ElMessage } from "element-plus";

export const useAnimeStore = defineStore("anime", {
  state() {
    return {
      animeInfo: {} as Anime,
    };
  },
  actions: {
    async getAnime(mikan_id: number) {
      let result = await reqAnimeInfo(mikan_id);
      if (result.status == 200) {
        this.animeInfo = result.data;
      }
    },
    async updateSubscribeStatus() {
      let result = await reqSubscribeAnime(this.reqSubscribeAnimeData);
      if (result.status == 201) {
        if (this.animeInfo.subscribe_status == 0) {
          ElMessage({
            message: "订阅成功",
            type: "success",
          });
          this.animeInfo.subscribe_status = 1;
        } else {
          ElMessage({
            message: "取消订阅成功",
            type: "success",
          });
          this.animeInfo.subscribe_status = 0;
        }
        return "ok";
      } else {
        return Promise.reject(new Error(result.data));
      }
    },
  },
  getters: {
    img_url: (state) => `path/${state.animeInfo.img_url}`,
    reqSubscribeAnimeData: (state) => {
      return {
        mikan_id: state.animeInfo.mikan_id,
        subscribe_status: state.animeInfo.subscribe_status,
      };
    },
  },
});
