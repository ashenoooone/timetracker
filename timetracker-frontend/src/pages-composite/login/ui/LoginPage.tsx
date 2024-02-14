import { Page } from "@/shared/ui/Page/Page";
import { LoginUser } from "@/features/loginUser";
import { Toaster } from "@/shared/ui/toast";
import React, { memo } from "react";

export const LoginPage = memo(() => {
  return (
    <div className={"bg-background flex min-h-screen"}>
      <Page className={"flex items-center"}>
        <LoginUser className={"w-[500px]"} />
      </Page>
      <Toaster />
    </div>
  );
});
