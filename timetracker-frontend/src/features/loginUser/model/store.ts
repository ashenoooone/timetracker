import { createEvent, createStore, sample } from "effector";
import { loginQuery } from "../api/login-query";

export const createLoginModel = () => {
  // stores
  const $email = createStore<string>("");
  const $password = createStore<string>("");
  const $error = createStore<string | null>(null);
  const $pending = loginQuery.$pending;

  //   events
  const emailChangeEv = createEvent<string>();
  const passwordChangeEv = createEvent<string>();
  const loginEv = createEvent<{ email: string; password: string }>();

  // binding events
  $email.on(emailChangeEv, (_, newEmail) => newEmail);
  $password.on(passwordChangeEv, (_, newPassword) => newPassword);

  // watchers
  loginQuery.finished.failure.watch((o) => {
    console.log(o);
  });

  // samples
  sample({
    clock: loginEv,
    target: loginQuery.start,
  });

  return {
    $email,
    $password,
    $pending,
    emailChangeEv,
    passwordChangeEv,
    loginEv,
  } as const;
};
