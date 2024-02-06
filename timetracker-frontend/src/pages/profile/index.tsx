import React from "react";
import { $user, checkUserEv } from "@/entities/user/model/store";
import { useUnit } from "effector-react";
import { GetServerSideProps } from "next";
import { allSettled, fork, serialize } from "effector";

function Index() {
  const [user] = useUnit([$user]);

  return <div className={""}>{JSON.stringify(user)}</div>;
}

export const getServerSideProps = (async (context) => {
  const scope = fork();

  await allSettled(checkUserEv, { scope });

  return {
    props: {
      values: serialize(scope),
    },
  };
}) satisfies GetServerSideProps;

export default Index;
