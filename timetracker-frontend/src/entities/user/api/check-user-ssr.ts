// serverSidePropsUtils.ts
import { allSettled, fork, serialize } from "effector";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { $userStatus, checkUserEv } from "@/entities/user";
import { UserLoginStatus } from "../model/types";

export async function checkUserSsr(
  context: GetServerSidePropsContext,
  status: UserLoginStatus = "not_authorized"
): Promise<GetServerSidePropsResult<{ [key: string]: any }>> {
  const cookies = context.req.cookies;
  const token = cookies.token;
  const scope = fork();

  await allSettled(checkUserEv, { scope, params: { token } });

  if (scope.getState($userStatus) === status) {
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
