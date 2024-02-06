import { createEffect, createEvent, createStore, sample } from "effector";
import { UserType } from "@/entities/user";
import { checkMe } from "../api/auth";
import { AxiosError, AxiosResponse } from "axios";
import { UserLoginStatus } from "./types";
import { debug } from "patronum";

// declaring stores
const $user = createStore<UserType | null>(null);
const $userStatus = createStore(UserLoginStatus.INITIAL);

// declaring events
const setUserEv = createEvent<UserType>();

const resetUserEv = createEvent();
const checkUserEv = createEvent();

// binding events to stores
$user.on(setUserEv, (_, user) => user);
$user.reset(resetUserEv);

// declaring effects
const checkUserFx = createEffect<
  // cookies type
  void,
  AxiosResponse<{ user: UserType }>,
  AxiosError
>();

// binding effects to stores
$userStatus.on(checkUserFx, (status) => {
  if (status === UserLoginStatus.INITIAL) return UserLoginStatus.PENDING;
  return status;
});
$userStatus.on(checkUserFx.done, () => UserLoginStatus.AUTHORIZED);
$userStatus.on(checkUserFx.fail, () => UserLoginStatus.NOT_AUTHORIZED);

// effects use
checkUserFx.use(async () => await checkMe());

// watchers
debug(checkUserFx, $userStatus, $user);

// samples
sample({
  clock: checkUserEv,
  target: checkUserFx,
});

sample({
  clock: checkUserFx.doneData,
  fn: (response) => response.data.user,
  target: setUserEv,
});

sample({
  clock: checkUserFx.fail,
  target: resetUserEv,
});

export { checkUserEv, $user, $userStatus };
