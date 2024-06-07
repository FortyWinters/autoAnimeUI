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
import type { Anime, Seeds, Seed, Subgroups, Tasks, qbTask } from "@/types";
import { ElMessage, ElLoading } from "element-plus";
import { watch, onBeforeUnmount } from "vue";

export const useAnimeStore = defineStore("anime", {
  state() {
    return {
      animeInfo: {} as Anime,
      seedInfo: [] as Seeds,
      subgroupInfo: [] as Subgroups,
      taskInfo: [] as Tasks,
      ws: null as WebSocket | null,
      qbTaskInfo: [] as qbTask[],
      isConnected: false,
      activeSubgroupId: -1,
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
          await this.getAnime(this.reqAnimeData.mikan_id);
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
    connectWs() {
      if (this.ws == null && !this.isConnected) {
        this.ws = new WebSocket("ws://127.0.0.1:8080/v2/ws/");

        this.ws.onopen = () => {
          this.isConnected = true;
          this.getTaskProgress(
            JSON.stringify(
              this.taskInfo.filter((task) => task.qb_task_status === 0)
            )
          );
        };
        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (Array.isArray(data)) {
              let qbTaskList: qbTask[] = data.map((qbTask) => ({
                torrent_name: qbTask.torrent_name,
                progress: qbTask.progress,
              }));
              this.qbTaskInfo = qbTaskList;
            } else {
              console.error("Recevied data is not an array", data);
            }
          } catch (error) {
            console.error("Failed to parse WebSocket data", error);
          }
        };
        this.ws.onerror = (error) => {
          console.error("WebSocket Error:", error);
        };
        this.ws.onclose = () => {
          this.isConnected = false;
        };
      } else {
        console.log("websocket connect failed, no available webSocket");
      }
    },
    disConnectWs() {
      if (this.ws && this.isConnected) {
        this.ws.close();
        this.ws = null;
        this.isConnected = false;
      } else {
        console.log("websocket disconnect failed, no available webSocket");
      }
    },
    getTaskProgress(data: string) {
      if (this.ws && this.isConnected) {
        this.ws.send(data);
      }
    },
    sendStopSignal() {
      if (this.ws && this.isConnected) {
        this.ws.send("STOP");
        this.isConnected = false;
        this.ws = null;
      }
    },
    setupWatchers() {
      const stopWatchTaskInfo = watch(
        () => this.taskInfo,
        (currentTasks, previousTasks) => {
          const tasksWithStatusZero = currentTasks.filter(
            (task) => task.qb_task_status === 0
          );
          const previousTasksWithStatusZero = previousTasks
            ? previousTasks.filter((task) => task.qb_task_status === 0)
            : [];

          if (
            tasksWithStatusZero.length !== previousTasksWithStatusZero.length
          ) {
            if (tasksWithStatusZero.length !== 0) {
              this.sendStopSignal();
              this.connectWs();
            } else {
              this.sendStopSignal();
            }
          }
        },
        {
          deep: true,
          immediate: true,
        }
      );

      onBeforeUnmount(() => {
        stopWatchTaskInfo();
      });
    },
    setActiveSubgroupId(subgroupId: number) {
      this.activeSubgroupId = subgroupId;
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
          seed = { ...seed, seed_status: updatedSeedStatus };
        }

        const correspondingQbTask = state.qbTaskInfo.find((qbTask) =>
          seed.seed_url.includes(String(qbTask.torrent_name.split("/").pop()))
        );

        if (seed.seed_status === 2 && correspondingQbTask) {
          const progress = Math.round(
            parseFloat(correspondingQbTask.progress.replace("%", "").trim())
          );
          seed = { ...seed, progress: progress };
          if (progress === 100) {
            seed.seed_status = 3;
          }
        }
        return seed;
      });
    },
  },
});
