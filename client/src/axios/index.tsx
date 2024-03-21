import axios from "axios";
import CustomLocalStorage from "@/utils/CustomLocalStorage";

import * as TokenService from "@/service/token";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_SERVER_URL,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = CustomLocalStorage.get("accessToken");

  return config;
});

instance.interceptors.response.use(
  (request) => request,
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
      } catch (error) {}
    }

    throw error;
  }
);

export default instance;
