import type { qbTask } from "@/types";
import { useAnimeStore } from '@/store/modules/anime'
import { storeToRefs } from "pinia";
import type { Task } from "@/types";
import DPlayer from 'dplayer';

export class WSClient {
  private static instance: WSClient | null = null; // 单例模式，确保只初始化一次连接
  private socket: WebSocket | null = null;
  private url: string;
  isConnected;
  isGetSeedsProgresTaskRunning;
  player: DPlayer | null = null;
  torrent_name: string | null = null;

  private constructor(url: string) {
    this.url = url;
    this.isConnected = false;
    this.isGetSeedsProgresTaskRunning = false;
  }

  public static getInstance(): WSClient {
    if (!this.instance) {
      const baseURL = import.meta.env.VITE_API_BASE_URL;
      const wsURL = baseURL.replace(/^http/, "ws") + "/v2/ws/";
      this.instance = new WSClient(wsURL);
    }
    return this.instance;
  }

  connect() {
    if (this.socket) {
      console.log("WebSocket already connected.");
      return;
    }

    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log("WebSocket connection established.");
      this.isConnected = true;
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handleMessage(data);
    };

    this.socket.onclose = () => {
      console.log("WebSocket connection closed.");
      this.isConnected = false;
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }

  sendMessage(message: object) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.error("WebSocket is not open. Unable to send message.");
    }
  }

  private handleMessage(message: any) {
    if (message.task_type === "SeedProgressReply") {
      this.processSeedsProgress(message.task_data)
    }
    else if (message.task_type === "GetVideoProgressRequest") {
      this.processVideoProgress();
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  getSeedsProgressTask(task_data: Task[]) {
    if (!this.isGetSeedsProgresTaskRunning) {
      this.sendMessage({
        task_type: "GetSeedsProgressRequest",
        task_data: task_data
      });
      this.isGetSeedsProgresTaskRunning = true
    }
  }

  stopGetSeedsProgressTask() {
    if (this.isGetSeedsProgresTaskRunning) {
      this.sendMessage(
        { task_type: "StopGetSeedsProgressRequest" }
      )
      this.isGetSeedsProgresTaskRunning = false;
    }
  }

  stopGetVideoProgressTask(){
    if(this.player){
      console.log("stopGetVideoProgressRequest")
      this.sendMessage(
        { task_type: "StopGetVideoProgressRequest" }
      )
      this.player = null;
      this.torrent_name = null;
    }
  }

  processSeedsProgress(message: any) {
    let animeStore = useAnimeStore();
    const { qbTaskInfo } = storeToRefs(animeStore)

    if (Array.isArray(message)) {
      let qbTaskList: qbTask[] = message.map((qbTask) => ({
        torrent_name: qbTask.torrent_name,
        progress: qbTask.progress,
      }));
      qbTaskInfo.value = qbTaskList;
    } else {
      console.error("Recevied data is not an array", message);
    }
  }

  processVideoProgress() {
    const progress = this.player?.video.currentTime;
    if (progress !== undefined) {
      this.sendMessage({
        task_type: "GetVideoProgressReply",
        task_data: {
          torrent_name: this.torrent_name,
          progress: Math.floor(progress),
        }
      });
    }
  }
}
