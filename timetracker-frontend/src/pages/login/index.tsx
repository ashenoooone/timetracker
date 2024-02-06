import React from "react";
import { Page } from "@/shared/ui/Page/Page";
import { LoginUser } from "@/features/loginUser";
import { Toaster } from "@/shared/ui/toast";
import { GetServerSideProps } from "next";

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
  return {
    props: {},
  };
}) satisfies GetServerSideProps;

export default Index;
