import axios from "axios";
import Cookies from "js-cookie";
import { COOKIES_ACCESS_TOKEN_KEY } from "@/shared/consts/cookies";

export const $api = axios.create({
  baseURL: process.env.API,
});

$api.interceptors.request.use((config) => {
  if (config.headers && !config.headers["Authorization"]) {
    config.headers["Authorization"] = `Bearer ${Cookies.get(
      COOKIES_ACCESS_TOKEN_KEY
    )}`;
  }
  return config;
});
