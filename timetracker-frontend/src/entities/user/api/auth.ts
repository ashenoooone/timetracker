import { $api } from "@/shared/api/api";

export const checkMe = () => {
  return $api.get("/auth/check");
};
