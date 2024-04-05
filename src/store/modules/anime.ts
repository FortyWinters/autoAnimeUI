import { defineStore } from "pinia";
import {
  reqAnimeInfo,
  reqSubscribeAnime,
  reqSeedInfo,
  reqSubgroupInfo,
  reqTaskInfo,
  reqUpdateAnimeSeed,
  reqDeleteAnimeSeed,
  reqDownloadAnimeSeed,
  reqAnimeDetail,
  reqDeleteAnimeTask,
  reqUpdateTask,
} from "@/api/anime";
import type {
  Anime,
  Seeds,
  Seed,
  Subgroups,
  Tasks,
  AnimeDetail,
} from "@/types";
import { ElMessage, ElLoading } from "element-plus";

export const useAnimeStore = defineStore("anime", {
  state() {
    return {
      animeInfo: {} as Anime,
      seedInfo: [] as Seeds,
      subgroupInfo: [] as Subgroups,
      taskInfo: [] as Tasks,
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
      if (result.status == 200) {
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
    async getSeed(mikan_id: number) {
      let result = await reqSeedInfo(mikan_id);
      if (result.status == 200) {
        this.seedInfo = result.data;
      }
    },
    async getSubgroup() {
      let result = await reqSubgroupInfo();
      if (result.status == 200) {
        this.subgroupInfo = result.data;
      }
    },
    async getTask(mikan_id: number) {
      let result = await reqTaskInfo(mikan_id);
      if (result.status == 200) {
        this.taskInfo = result.data;
      }
    },
    async updateSeed() {
      const loading = ElLoading.service({
        lock: true,
        text: "正在更新...",
        background: "rgba(0, 0, 0, 0.7)",
      });
      try {
        let result = await reqUpdateAnimeSeed(this.reqAnimeData);
        if (result.status == 200) {
          loading.close();
          await this.getSeed(this.reqAnimeData.mikan_id);
          await this.getSubgroup();
          await this.getTask(this.reqAnimeData.mikan_id);
          ElMessage({
            message: "种子更新成功",
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
          message: error instanceof Error ? error.message : "种子更新失败",
        });
      }
      return "ok";
    },
    async deleteSeed() {
      let result = await reqDeleteAnimeSeed(this.reqAnimeData);
      if (result.status == 200) {
        await this.getSeed(this.reqAnimeData.mikan_id);
        await this.getSubgroup();
        await this.getTask(this.reqAnimeData.mikan_id);
        ElMessage({
          message: "删除成功",
          type: "success",
        });
        return "ok";
      } else {
        return Promise.reject(new Error(result.data));
      }
    },
    async downloadSeed(seed: Seed) {
      const loading = ElLoading.service({
        lock: true,
        text: "正在创建任务...",
        background: "rgba(0, 0, 0, 0.7)",
      });
      try {
        let result = await reqDownloadAnimeSeed(seed);
        if (result.status == 200) {
          loading.close();
          await this.getSeed(this.reqAnimeData.mikan_id);
          await this.getSubgroup();
          await this.getTask(this.reqAnimeData.mikan_id);
          ElMessage({
            message: "开始下载",
            type: "success",
          });
          return "ok";
        } else {
          loading.close();
          return Promise.reject(new Error(result.data));
        }
      } catch (error) {
        loading.close();
        ElMessage.error({
          message: error instanceof Error ? error.message : "任务创建失败",
        });
      }
    },
    async deleteTask(seed: Seed) {
      const loading = ElLoading.service({
        lock: true,
        text: "正在删除任务...",
        background: "rgba(0, 0, 0, 0.7)",
      });
      try {
        let result = await reqDeleteAnimeTask(seed);
        if (result.status == 200) {
          loading.close();
          await this.getSeed(this.reqAnimeData.mikan_id);
          await this.getSubgroup();
          await this.getTask(this.reqAnimeData.mikan_id);
          ElMessage({
            message: "删除成功",
            type: "success",
          });
          return "ok";
        } else {
          loading.close();
          return Promise.reject(new Error(result.data));
        }
      } catch (error) {
        loading.close();
        ElMessage.error({
          message: error instanceof Error ? error.message : "删除失败",
        });
      }
    },
    async getAnimeDetail(mikan_id: number) {
      let result = await reqAnimeDetail(mikan_id);
      if (result.status == 200) {
        this.animeInfo = result.data.anime_info;
        this.seedInfo = result.data.seed_info;
        this.subgroupInfo = result.data.subgroup_info;
        this.taskInfo = result.data.task_info;
      }
    },
    resetState() {
      this.animeInfo = {} as Anime;
      this.seedInfo = [] as Seeds;
      this.subgroupInfo = [] as Subgroups;
      this.taskInfo = [] as Tasks;
    },
    async updateTask() {
      await reqUpdateTask();
    },
  },
  getters: {
    img_url: (state) =>
      `src/assets/images/anime_list/${state.animeInfo.img_url}`,
    reqSubscribeAnimeData: (state) => {
      return {
        mikan_id: state.animeInfo.mikan_id,
        subscribe_status: state.animeInfo.subscribe_status,
      };
    },
    reqAnimeData: (state) => {
      return {
        mikan_id: state.animeInfo.mikan_id,
      };
    },
    animeSubgroupInfo: (state) => {
      const uniqueSubgroupIds = new Set(
        state.seedInfo.map((seed) => seed.subgroup_id)
      );
      return state.subgroupInfo.filter((subgroup) =>
        uniqueSubgroupIds.has(subgroup.subgroup_id)
      );
    },
    animeSeedInfo: (state) => {
      return state.seedInfo.map((seed) => {
        const correspondingTask = state.taskInfo.find((task) =>
          seed.seed_url.includes(String(task.torrent_name.split("/").pop()))
        );
        if (correspondingTask) {
          let updatedSeedStatus = seed.seed_status;
          switch (correspondingTask.qb_task_status) {
            case 0:
              updatedSeedStatus = 2; // downloading
              break;
            case 1:
              updatedSeedStatus = 3; // downloaded
              break;
          }
          return { ...seed, seed_status: updatedSeedStatus };
        }
        return seed;
      });
    },
  },
});
