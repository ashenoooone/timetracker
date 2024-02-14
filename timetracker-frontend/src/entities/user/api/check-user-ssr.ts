// serverSidePropsUtils.ts
import { allSettled, fork, serialize } from "effector";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { $userStatus, checkUserEv } from "@/entities/user";
import { UserLoginStatus } from "../model/types";

export async function checkUserSsr(
  context: GetServerSidePropsContext,
  banned_status: UserLoginStatus = "not_authorized"
): Promise<GetServerSidePropsResult<{ [key: string]: any }>> {
  const cookies = context.req.cookies;
  const token = cookies.access_token;
  const scope = fork();

  await allSettled(checkUserEv, { scope, params: { token } });

  if (scope.getState($userStatus) === banned_status) {
    return {
      redirect: {
        destination: "/login",
        permanent: true,
      },
      props: {
        values: serialize(scope),
      },
    };
  }

  return {
    props: {
      values: serialize(scope),
    },
  };
}
