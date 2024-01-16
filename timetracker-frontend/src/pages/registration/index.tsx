import React from "react";
import { Page } from "@/shared/ui/Page/Page";
import { RegisterUser } from "@/features/registerUser";
import { Toaster } from "@/shared/ui/toast";
import { checkMeServerRequest } from "@/entities/user";
import { GetServerSideProps } from "next";

const Index = () => {
  return (
    <div className={"bg-background flex min-h-screen"}>
      <Page className={"flex items-center"}>
        <RegisterUser className={"w-[500px]"} />
      </Page>
      <Toaster />
    </div>
  );
};

export const getServerSideProps = (async (context) => {
  const { access_token } = context.req.cookies;
  const checkMe = await checkMeServerRequest({
    token: access_token,
  });

  if (!checkMe.error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}) satisfies GetServerSideProps;

export default Index;
