import axios from "axios";
import CustomLocalStorage from "@/utils/CustomLocalStorage";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_SERVER_URL,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = CustomLocalStorage.get("accessToken");
  return config;
});

instance.interceptors.response.use((request) => {
  console.log(request);
  return request;
});

export default instance;
