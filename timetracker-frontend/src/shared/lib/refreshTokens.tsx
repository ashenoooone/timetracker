import { loginResponseSchema, LoginResponseType } from "@/features/loginUser";
import { $api } from "@/shared/api/api";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { COOKIES_REFRESH_TOKEN_KEY } from "@/shared/consts/cookies";

interface RefreshTokensReturn {
  response?: LoginResponseType;
  error?: AxiosError;
}
export const refreshTokens = async (): Promise<RefreshTokensReturn> => {
  try {
    const response = await $api.post<LoginResponseType>("/auth/token/refresh", {
      token: Cookies.get(COOKIES_REFRESH_TOKEN_KEY),
    });

    const tokens = loginResponseSchema.parse(response.data);

    return { response: tokens };
  } catch (e) {
    return { error: e as AxiosError };
  }
};
