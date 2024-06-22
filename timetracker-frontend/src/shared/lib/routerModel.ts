import { createEvent, createStore, sample } from "effector";
import { debug } from "patronum";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

// defining store
export const $router = createStore<null | AppRouterInstance>(null);
// events
export const routerChangedEv = createEvent<null | AppRouterInstance>();
// samples
sample({
  clock: routerChangedEv,
  target: $router,
});

debug(routerChangedEv, $router);
