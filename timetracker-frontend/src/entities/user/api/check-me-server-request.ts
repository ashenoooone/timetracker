import { $api } from "@/shared/api/api";
import { AxiosError, AxiosResponse } from "axios";
import { UserSchema, UserType } from "../model/types";

interface CheckMeServerRequestReturn {
  error?: AxiosError;
  response?: AxiosResponse<UserType>;
}

export const checkMeServerRequest = async ({
  token,
}: {
  token?: string;
}): Promise<CheckMeServerRequestReturn> => {
  try {
    const response = await $api.get<UserType>("/auth/check", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const parsedData = UserSchema.parse(response.data);

    return {
      response: { ...response, data: parsedData },
    };
  } catch (e) {
    return {
      error: e as AxiosError,
    };
  }
};
