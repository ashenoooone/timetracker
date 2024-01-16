import useRequest, { IUseRequestState } from "@/shared/hooks/useRequest";
import {
  ILoginData,
  LoginResponseType,
} from "@/features/loginUser/model/types";
import { IAxiosError } from "@/shared/api/types";
import { useCallback } from "react";

interface UseAuthReturn
  extends IUseRequestState<LoginResponseType, IAxiosError> {
  sendLoginRequest: (data: ILoginData) => Promise<void>;
}
export const useAuth = (): UseAuthReturn => {
  const { isLoading, response, sendRequest, error } = useRequest<
    LoginResponseType,
    IAxiosError
  >();

  const sendLoginRequest = useCallback(
    async (data: ILoginData) => {
      await sendRequest({
        method: "POST",
        url: "/auth/login",
        data,
      });
    },
    [sendRequest]
  );

  return {
    error,
    isLoading,
    response,
    sendLoginRequest,
  };
};
