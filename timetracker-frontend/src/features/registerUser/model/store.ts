import { attach, combine, createEvent, createStore, sample } from "effector";
import { getObjectEntries } from "@/shared/lib/getObjectEntries";
import { registerUserMutation } from "../api/register-user-mutation";
import { apiErrorResponse } from "@/shared/contracts";
import { $router } from "@/shared/lib/routerModel";

export const createRegisterModel = () => {
  // stores
  const $emailError = createStore<null | string>(null);
  const $passwordError = createStore<null | string>(null);
  const $confirmPasswordError = createStore<null | string>(
    "Пароли не совпадают"
  );
  const $email = createStore<string>("");
  const $serverError = createStore<string>("");
  const $password = createStore<string>("");
  const $confirmPassword = createStore<string>("");
  const $pending = registerUserMutation.$pending;
  const $success = registerUserMutation.$succeeded;
  const $errors = combine({
    email: $emailError,
    password: $passwordError,
    confirmPassword: $confirmPasswordError,
  });
  const $formValid = $errors.map((errors) =>
    getObjectEntries(errors).every(([k, v]) => !Boolean(v))
  );
  // events
  const changeEmailEv = createEvent<string>();
  const changePasswordEv = createEvent<string>();
  const changeConfirmPasswordEv = createEvent<string>();
  const validateEmailEv = createEvent<string>();
  const validatePasswordEv = createEvent<string>();
  const registerUserEv = createEvent();
  const validateConfirmPasswordEv = createEvent<{
    password: string;
    confirmPassword: string;
  }>();

  // effects
  const navigateToLoginPageFx = attach({
    source: $router,
    effect: async (router) => {
      if (router) {
        await router.push("/login");
      }
    },
  });

  // binding events
  $email.on(changeEmailEv, (_, newEmail) => newEmail);
  $password.on(changePasswordEv, (_, newPassword) => newPassword);
  $confirmPassword.on(
    changeConfirmPasswordEv,
    (_, newConfirmPassword) => newConfirmPassword
  );
  $emailError.on(validateEmailEv, (_, email) => {
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return "Введите корректный email";
    }
    return null;
  });

  $passwordError.on(validatePasswordEv, (_, password) => {
    // Минимальная длина пароля: 6 символов
    if (password.length < 6) {
      return "Минимальная длина пароля должна быть 6.";
    }

    // Проверка наличия хотя бы одной заглавной буквы
    if (!/[A-Z]/.test(password)) {
      return "Пароль должен иметь хотя бы одну заглавную букву";
    }

    // Проверка наличия хотя бы одной строчной буквы
    if (!/[a-z]/.test(password)) {
      return "Пароль должен иметь хотя бы одной строчную букву.";
    }

    // Проверка наличия хотя бы одной цифры
    if (!/\d/.test(password)) {
      return "Пароль должен содержать хотя бы одну цифру.";
    }

    // Проверка наличия хотя бы одного специального символа
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return 'Пароль должен содержать хотя бы один специальный символ (!@#$%^&*(),.?":{}|<>)';
    }

    return null;
  });

  $confirmPasswordError.on(
    validateConfirmPasswordEv,
    (_, { password, confirmPassword }) => {
      if (password !== confirmPassword) {
        return "Пароли не совпадают";
      }
      return null;
    }
  );

  // samples
  // email validation sample
  sample({
    clock: changeEmailEv,
    source: $email,
    target: validateEmailEv,
  });

  // password validation sample
  sample({
    clock: changePasswordEv,
    source: $password,
    target: validatePasswordEv,
  });

  // confirm password validation sample
  sample({
    clock: [changeConfirmPasswordEv, changePasswordEv],
    source: {
      password: $password,
      confirmPassword: $confirmPassword,
    },
    target: validateConfirmPasswordEv,
  });

  sample({
    clock: registerUserEv,
    source: {
      email: $email,
      password: $password,
    },
    target: registerUserMutation.start,
    filter: $formValid,
  });

  sample({
    clock: registerUserMutation.$failed,
    source: registerUserMutation.finished.failure,
    fn: (error) => apiErrorResponse.parse(error.error).response.message,
    target: $serverError,
  });

  sample({
    clock: registerUserMutation.$succeeded,
    target: navigateToLoginPageFx,
  });

  return {
    $email,
    $errors,
    $password,
    $confirmPassword,
    $formValid,
    changeEmailEv,
    changePasswordEv,
    changeConfirmPasswordEv,
    $pending,
    registerUserEv,
    $serverError,
    $success,
  } as const;
};
