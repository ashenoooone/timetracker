import { QueryStatus, useQuery } from "@tanstack/react-query";
import { USER_QUERY_KEY } from "../model/consts";
import { $api } from "@/shared/api/api";
import { UserType } from "@/entities/user";

interface IGetMeReturn {
  isLoading: boolean;
  error: Error | null;
  data?: UserType;
  isError: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  status: QueryStatus;
}

export const useGetMe = (): IGetMeReturn => {
  const { isLoading, error, status, isFetching, data, isError, isSuccess } =
    useQuery({
      queryKey: [USER_QUERY_KEY],
      retry: false,
      queryFn: async () => {
        const res = await $api.get<UserType>("/auth/check");
        return res.data;
      },
    });

  return {
    data,
    isError,
    isSuccess,
    isFetching,
    error,
    isLoading,
    status,
  };
};
