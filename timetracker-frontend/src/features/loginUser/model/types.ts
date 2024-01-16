import { z } from "zod";

export const loginResponseSchema = z.object({
  refreshToken: z.string(),
  accessToken: z.string(),
});

export type LoginResponseType = z.infer<typeof loginResponseSchema>;

export interface ILoginData {
  email: string;
  password: string;
}
