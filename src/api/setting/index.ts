import type { ReqCongfig } from "@/types";
import request from "@/utils/request";

enum API {
  RELOAD_TASK_URL = "/setting/reload_task",
  AUTO_MODE_ON_URL = "/setting/start",
  AUTO_MODE_OFF_URL = "/setting/exit",
  AUTO_MODE_STATUS_URL = "/setting/get_task_status",
  MODIFY_CONFIG_URL = "/setting/modify_config",
  GET_CONFIG_URL = "/setting/get_config"
}

export const reloadTask = () => request.get(API.RELOAD_TASK_URL);
export const autoModeOn = () => request.post(API.AUTO_MODE_ON_URL);
export const autoModeOff = () => request.post(API.AUTO_MODE_OFF_URL);
export const autoModeStatus = () => request.get(API.AUTO_MODE_STATUS_URL);
export const modifyConfig = (config: ReqCongfig) => request.post(API.MODIFY_CONFIG_URL, config);
export const getConfig = () => request.get(API.GET_CONFIG_URL);