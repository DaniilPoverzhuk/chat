import axios from "axios";
import CustomLocalStorage from "@/utils/CustomLocalStorage";

import * as TokenService from "@/service/token";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_SERVER_URL,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  console.log("request");
  config.headers.Authorization = CustomLocalStorage.get("accessToken");
  return config;
});

instance.interceptors.response.use(
  async (request) => {
    return request;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      const response = await TokenService.update();
      const { user } = response.data;

      CustomLocalStorage.set<string>(user.accessToken, "accessToken");

      return instance.request(originalRequest);
    }
  }
);

export default instance;
