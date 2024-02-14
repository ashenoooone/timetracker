import { createJsonMutation, declareParams } from "@farfetched/core";
import { ILoginData, loginResponseSchema } from "../model/types";
import { apiUrl } from "@/shared/api/api";
import { zodContract } from "@farfetched/zod";

const loginContract = zodContract(loginResponseSchema);

export const loginQuery = createJsonMutation({
  params: declareParams<ILoginData>(),
  request: {
    method: "POST",
    url: apiUrl() + "auth/login",
    body: ({ password, email }: ILoginData) => ({ password, email }),
  },
  response: {
    contract: loginContract,
  },
});
