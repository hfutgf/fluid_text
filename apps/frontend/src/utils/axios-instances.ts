import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL!;

export const axiosPublic = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export const axiosAuth = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

axiosAuth.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> => {
    const session = await getSession();
    if (session && config.headers) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosAuth.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    return Promise.reject(error);
  },
);
