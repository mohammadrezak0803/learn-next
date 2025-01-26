import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: { "Content-Type": "application/json" },
});

/**
 * Global api interceptor
 * @param {InternalAxiosRequestConfig} request
 */
const apiInterceptor = async (request: InternalAxiosRequestConfig) => {
  return request;
};

const errorInterceptor = async (axiosError: AxiosError) => {
  return Promise.reject(axiosError);
};

// Request interceptors
api.interceptors.request.use(apiInterceptor);

// Response interceptors
api.interceptors.response.use((res) => res, errorInterceptor);
