import axios from "axios";
import Cookies from "js-cookie";
import {
  COOKIES_ACCESS_TOKEN_KEY,
  COOKIES_REFRESH_TOKEN_KEY,
} from "@/shared/consts/cookies";
import { refreshTokens } from "@/shared/lib/refreshTokens";

export const $api = axios.create({
  baseURL: process.env.API,
  withCredentials: true,
});

$api.interceptors.request.use((config) => {
  if (config.headers && !config.headers["Authorization"]) {
    config.headers["Authorization"] = `Bearer ${Cookies.get(
      COOKIES_ACCESS_TOKEN_KEY
    )}`;
  }
  return config;
});

$api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { response, error } = await refreshTokens();

      if (error || !response) {
        return Promise.reject(error);
      }

      Cookies.set(COOKIES_REFRESH_TOKEN_KEY, response.refreshToken);
      Cookies.set(COOKIES_ACCESS_TOKEN_KEY, response.accessToken);

      axios.defaults.headers.common["Authorization"] =
        "Bearer " + response?.accessToken;
      return $api(originalRequest);
    }
    return Promise.reject(error);
  }
);
