import { defineStore } from "pinia";
interface Theater {
  theater_id: number;
  theater_name: string;
  anime_name: string;
  progress:number;
}
type Theaters = Theater[];

export const useTheaterStore = defineStore("theater", {
  state() {
    return {
      theaterList: [] as Theaters,
    };
  },
  actions: {
    async getTheaterList() {
      // TODO: 实现获取放映厅列表的API调用
      // 目前使用模拟数据进行测试
      this.theaterList = [
        {
          theater_id: 1,
          theater_name: "放映厅1",
          anime_name: "进击的巨人",
          progress: 50,
        },
        {
          theater_id: 2,
          theater_name: "放映厅2",
          anime_name: "咒术回战",
          progress: 50,
        },
        {
          theater_id: 3,
          theater_name: "放映厅3",
          anime_name: "间谍过家家",
          progress: 50,
        }
      ];
    },
  },
});