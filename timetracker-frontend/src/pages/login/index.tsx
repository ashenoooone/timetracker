import React from "react";
import { Page } from "@/shared/ui/Page/Page";
import { LoginUser } from "@/features/loginUser";
import { Toaster } from "@/shared/ui/toast";
import { GetServerSideProps } from "next";
import { checkUserSsr } from "@/entities/user/api/check-user-ssr";

const Index = () => {
  return (
    <div className={"bg-background flex min-h-screen"}>
      <Page className={"flex items-center"}>
        <LoginUser className={"w-[500px]"} />
      </Page>
      <Toaster />
    </div>
  );
};

export const getServerSideProps = (async (context) => {
  return checkUserSsr(context, "authorized");
}) satisfies GetServerSideProps;

export default Index;
