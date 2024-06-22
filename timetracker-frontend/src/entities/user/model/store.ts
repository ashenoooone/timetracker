import { createEvent, createStore, sample } from "effector";
import { UserType } from "@/entities/user";
import { UserLoginStatus } from "./types";
import { debug } from "patronum";
import { checkUserQuery } from "../api/check-user-query";

// declaring stores
const $user = createStore<UserType | null>(null);
const $userStatus = createStore<UserLoginStatus>("initial");

// declaring events
const setUserEv = createEvent<UserType | null>();

const resetUserEv = createEvent();
const checkUserEv = createEvent<{ token: string }>();

// binding events to stores
$user.on(setUserEv, (_, user) => user);
$user.reset(resetUserEv);

// binding effects to stores
$userStatus.on(checkUserQuery.$pending, (status) => {
  if (status === "initial") return "pending";
  return status;
});
$userStatus.on(checkUserQuery.$succeeded, () => "authorized");
$userStatus.on(checkUserQuery.$failed, () => "not_authorized");

// watchers
debug($userStatus);

// samples
sample({
  clock: checkUserEv,
  target: checkUserQuery.start,
});

sample({
  clock: checkUserQuery.$data,
  target: setUserEv,
  filter: checkUserQuery.$succeeded,
});

sample({
  clock: checkUserQuery.$failed,
  target: resetUserEv,
});

export { checkUserEv, $user, $userStatus };
