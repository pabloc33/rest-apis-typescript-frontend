import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { getEnvVariables } from "../helpers";

const { VITE_API_URL } = getEnvVariables();

const axiosInstance: AxiosInstance = axios.create({
  baseURL: VITE_API_URL,
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");

  config.headers.setAuthorization(`Bearer ${token}`);

  return config;
});

export default axiosInstance;
