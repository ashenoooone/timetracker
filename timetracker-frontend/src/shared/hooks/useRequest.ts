import { useState } from "react";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { $api } from "@/shared/api/api";

interface UseRequestProps<T = any> {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
}

export interface IUseRequestState<TData = any, TError = any> {
  error: AxiosError<TError> | null;
  isLoading: boolean;
  response: AxiosResponse<TData> | null;
}

interface UseRequestResult<TData = any, TError = any>
  extends IUseRequestState<TData, TError> {
  sendRequest: (props: UseRequestProps<TData>) => Promise<void>;
}

const useRequest = <TData = any, TError = any>(): UseRequestResult<
  TData,
  TError
> => {
  const [error, setError] = useState<AxiosError<TError> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<AxiosResponse<TData> | null>(null);

  const sendRequest = async (props: UseRequestProps<TData>): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const { url, method = "GET", data, params, headers } = props;
      const config: AxiosRequestConfig = { url, method, data, params, headers };
      const result = await $api<TData>(config);
      setResponse(result);
    } catch (error) {
      setError(error as AxiosError<TError>);
    } finally {
      setIsLoading(false);
    }
  };

  return { error, isLoading, response, sendRequest };
};

export default useRequest;
