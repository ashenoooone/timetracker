import { UserSchema } from "@/entities/user/model/types";

export interface IRegisterValidation {
  errors: {
    password: string | null;
    confirmPassword: string | null;
    email: string | null;
  };
}

export interface IRegisterData {
  email: string;
  password: string;
}

export const registerResponseSchema = UserSchema;
