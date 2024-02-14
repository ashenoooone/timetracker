import { createJsonMutation, declareParams } from "@farfetched/core";
import { apiUrl } from "@/shared/api/api";
import { zodContract } from "@farfetched/zod";
import { IRegisterData, registerResponseSchema } from "../model/types";

const registerContract = zodContract(registerResponseSchema);

export const registerUserMutation = createJsonMutation({
  params: declareParams<IRegisterData>(),
  request: {
    method: "POST",
    url: apiUrl() + "auth/register",
    body: ({ password, email }: IRegisterData) => ({ password, email }),
  },
  response: {
    contract: registerContract,
  },
});
