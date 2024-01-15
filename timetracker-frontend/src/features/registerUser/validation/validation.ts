export interface IRegisterValidation {
  errors: {
    password: string | null;
    confirmPassword: string | null;
    email: string | null;
  };
}
