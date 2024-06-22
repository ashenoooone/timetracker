import { Page } from "@/shared/ui/page/Page";
import { RegisterUser } from "@/features/registerUser";
import { Toaster } from "@/shared/ui/toast";
import React, { memo } from "react";

export const RegistrationPage = memo(() => {
  return (
    <div className={"bg-background flex min-h-screen"}>
      <Page className={"flex items-center"}>
        <RegisterUser className={"w-[500px]"} />
      </Page>
      <Toaster />
    </div>
  );
});
