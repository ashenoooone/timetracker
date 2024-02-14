import React from "react";
import { $user } from "@/entities/user/model/store";
import { useUnit } from "effector-react";
import { GetServerSideProps } from "next";
import { checkUserSsr } from "@/entities/user/api/check-user-ssr";

function Index() {
  const [user] = useUnit([$user]);

  return <div className={""}>{JSON.stringify(user)}</div>;
}

export const getServerSideProps = (async (context) => {
  return await checkUserSsr(context);
}) satisfies GetServerSideProps;

export default Index;
