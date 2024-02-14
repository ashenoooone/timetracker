import { createJsonQuery, declareParams } from "@farfetched/core";
import { apiUrl } from "@/shared/api/api";
import { zodContract } from "@farfetched/zod";
import { UserSchema } from "../model/types";

const checkUserContract = zodContract(UserSchema);

export const checkUserQuery = createJsonQuery({
  params: declareParams<{ token: string }>(),
  request: {
    method: "GET",
    url: apiUrl() + "auth/check",
    headers: ({ token }) => ({ authorization: `Bearer ${token}` }),
  },
  response: {
    contract: checkUserContract,
  },
});
