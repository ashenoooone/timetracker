import { createEvent, createStore, sample } from "effector";
import { NextRouter } from "next/router";

// defining store
export const $router = createStore<null | NextRouter>(null);
// events
export const routerChangedEv = createEvent<null | NextRouter>();
// samples
sample({
  clock: routerChangedEv,
  target: $router,
});
