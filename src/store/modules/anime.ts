import { defineStore } from "pinia";
import { reqAnimeInfo } from "@/api/anime";
import type { Anime } from "@/types";

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
  },
  getters: {
    img_url: (state) => `path/${state.animeInfo.img_url}`,
  },
});
