import axios from "axios";
import LocalStorage from "@/utils/localStorage";

const instance = axios.create({
  baseURL: "http://localhost:5001/",
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = LocalStorage.get("accessToken");
  return config;
});

instance.interceptors.response.use((request) => {
  console.log(request);

  return request;
});

export default instance;
