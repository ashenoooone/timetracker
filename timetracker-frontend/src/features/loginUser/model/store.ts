import { createEffect, createEvent, createStore, sample } from "effector";
import { loginQuery } from "../api/login-query";
import { attach } from "effector/compat";
import { $router } from "@/shared/lib/routerModel";
import { apiErrorResponse } from "@/shared/contracts";
import { LoginResponseType } from "../model/types";
import Cookies from "js-cookie";
import { COOKIES_ACCESS_TOKEN_KEY } from "@/shared/consts/cookies";

export const createLoginModel = () => {
  // stores
  const $email = createStore<string>("");
  const $password = createStore<string>("");
  const $error = createStore<string>("");
  const $pending = loginQuery.$pending;

  //   events
  const emailChangeEv = createEvent<string>();
  const passwordChangeEv = createEvent<string>();
  const loginEv = createEvent<{ email: string; password: string }>();

  // effects
  const saveTokensFx = createEffect<LoginResponseType, void>({
    handler: (params) => {
      Cookies.set(COOKIES_ACCESS_TOKEN_KEY, params.accessToken);
    },
  });
  const navigateToProfileFx = attach({
    source: $router,
    effect: async (router) => {
      if (router) await router.push("/profile");
    },
  });

  // binding events
  $email.on(emailChangeEv, (_, newEmail) => newEmail);
  $password.on(passwordChangeEv, (_, newPassword) => newPassword);

  // samples
  sample({
    clock: loginEv,
    target: loginQuery.start,
  });

  sample({
    clock: loginQuery.$succeeded,
    target: navigateToProfileFx,
  });

  sample({
    clock: loginQuery.$succeeded,
    source: loginQuery.finished.success,
    fn: (response) => response.result,
    target: saveTokensFx,
  });

  sample({
    clock: loginQuery.$failed,
    source: loginQuery.finished.failure,
    fn: (error) => apiErrorResponse.parse(error.error).response.message,
    target: $error,
  });

  return {
    $email,
    $password,
    $pending,
    emailChangeEv,
    passwordChangeEv,
    loginEv,
    $error,
  } as const;
};
