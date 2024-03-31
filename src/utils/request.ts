import axios from "axios";
import { ElMessage } from "element-plus";

const request = axios.create({
  baseURL: "/v2",
  timeout: 5000,
});

request.interceptors.request.use((config) => {
  return config;
});

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let status = error.response.status;
    switch (status) {
      case 404:
        ElMessage({
          type: "error",
          message: "请求失败，路径出现问题",
        });
        break;
      case 500 | 501 | 504 | 505:
        ElMessage({
          type: "error",
          message: "服务器故障",
        });
        break;
      case 401:
        ElMessage({
          type: "error",
          message: "参数错误",
        });
        break;
    }
    return Promise.reject(new Error(error.message));
  }
);

export default request;
