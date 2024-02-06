import { z } from "zod";

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export const UserSchema = z.object({
  id: z.number(),
  email: z.string(),
  role: z.array(z.enum([Role.USER, Role.ADMIN])),
});

export type UserType = z.infer<typeof UserSchema>;

export enum UserLoginStatus {
  INITIAL = 0,
  AUTHORIZED = 1,
  PENDING = 2,
  NOT_AUTHORIZED = 3,
}
