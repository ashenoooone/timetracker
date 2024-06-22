"use server";
import { allSettled, fork, Scope } from "effector";
import { $user, $userStatus, checkUserEv } from "@/entities/user";
import { UserLoginStatus } from "../model/types";
import { cookies } from "next/headers";
import { COOKIES_ACCESS_TOKEN_KEY } from "@/shared/consts/cookies";
import { redirect } from "next/navigation";
import { paths } from "@/shared/consts/paths";

export type CheckUserSsr = {
  token?: string;
  banned_status?: UserLoginStatus;
};

export const checkUserSsr = async ({
  banned_status,
  token,
}: CheckUserSsr): Promise<Scope | null> => {
  const scope = fork();

  await allSettled(checkUserEv, { scope, params: { token } });

  if (
    scope.getState($userStatus) === banned_status ||
    (banned_status === "authorized" && scope.getState($user) !== null)
  ) {
    return null;
  }

  return scope;
};

export const checkUser = async ({
  banned_status,
}: {
  banned_status?: UserLoginStatus;
}): Promise<Scope> => {
  const cookieStore = cookies();

  const user = await checkUserSsr({
    token: cookieStore.get(COOKIES_ACCESS_TOKEN_KEY)?.value,
    banned_status: banned_status,
  });

  if (!user) redirect(paths.login);

  return user;
};
