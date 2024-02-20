import axios from "axios";
import CustomLocalStorage from "@/utils/CustomLocalStorage";

import * as TokenService from "@/service/token";

console.log(import.meta.env.VITE_BASE_SERVER_URL);

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_SERVER_URL,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  console.log("request - ", config, "request data - ", config.data);
  config.headers.Authorization = CustomLocalStorage.get("accessToken");
  return config;
});

instance.interceptors.response.use(
  (request) => {
    return request;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.config.url === "/token/update") {
      throw error;
    }

    if (error.response?.status === 401 && !error.config.isRepeatRequest) {
      originalRequest.isRepeatRequest = true;

      try {
        const response = await TokenService.update();
        const { user } = response.data;

        CustomLocalStorage.set<string>(user.accessToken, "accessToken");

        return instance.request(originalRequest);
      } catch (error) {
        console.log("error");
      }
    }

    throw error;
  }
);

export default instance;
