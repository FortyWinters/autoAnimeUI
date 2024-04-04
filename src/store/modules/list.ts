import { defineStore } from "pinia";
import { reqAnimeHome } from "@/api/home";
import { reqAnimeBroadcast, reqUpdateAnimeBroadcast } from "@/api/list";
import type { Animes, ReqAnimeBroadcast } from "@/types";
import { ElMessage, ElLoading } from "element-plus";

export const useListStore = defineStore("list", {
  state() {
    return {
      animeList: [] as Animes,
    };
  },
  actions: {
    async getHomeList() {
      let result = await reqAnimeHome();
      if (result.status == 200) {
        this.animeList = result.data;
      } else {
        return Promise.reject(new Error(result.data));
      }
    },
    async getBroadcastList(item: ReqAnimeBroadcast) {
      let result = await reqAnimeBroadcast(item);
      if (result.status == 200) {
        this.animeList = result.data;
        return "ok";
      } else {
        return Promise.reject(new Error(result.data));
      }
    },
    async updateBroadcastList(item: ReqAnimeBroadcast) {
      const loading = ElLoading.service({
        lock: true,
        text: "正在更新...",
        background: "rgba(0, 0, 0, 0.7)",
      });
      try {
        let result = await reqUpdateAnimeBroadcast(item);
        if (result.status == 200) {
          loading.close();
          await this.getBroadcastList(item);
          ElMessage({
            message: "番剧列表更新成功",
            type: "success",
          });
          return "ok";
        } else {
          loading.close();
          throw new Error(result.data || "未知错误");
        }
      } catch (error) {
        loading.close();
        ElMessage.error({
          message: error instanceof Error ? error.message : "番剧列表更新失败",
        });
      }
      return "ok";
    },
  },
});
