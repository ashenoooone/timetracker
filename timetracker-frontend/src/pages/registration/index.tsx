import React from "react";
import { Page } from "@/shared/ui/Page/Page";
import { RegisterUser } from "@/features/registerUser";
import { Toaster } from "@/shared/ui/toast";

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

export default Index;
