import React from "react";
import { LoginUser } from "@/features/loginUser";
import { Page } from "@/shared/ui/Page/Page";
import { Toaster } from "@/shared/ui/toast";

export default function login() {
  return (
    <div className={"bg-background flex min-h-screen"}>
      <Page className={"flex items-center"}>
        <LoginUser className={"w-[500px]"} />
      </Page>
      <Toaster />
    </div>
  );
}
