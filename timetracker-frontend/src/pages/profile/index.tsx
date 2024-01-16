import React from "react";
import { checkMeServerRequest } from "@/entities/user";
import { GetServerSideProps } from "next";
import { UserType } from "@/entities/user/model/types";

interface Props {
  user?: UserType;
}

export default function index(props: Props) {
  return <div className={""}>{JSON.stringify(props.user)}</div>;
}

export const getServerSideProps = (async (context) => {
  const { access_token } = context.req.cookies;
  const checkMe = await checkMeServerRequest({
    token: access_token,
  });

  if (checkMe.error) {
    console.log(checkMe.error);

    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: checkMe.response?.data,
    },
  };
}) satisfies GetServerSideProps<Props>;
