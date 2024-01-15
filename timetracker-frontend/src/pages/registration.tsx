import React from "react";
import { RegisterUser } from "@/features/registerUser";
import { Page } from "@/shared/ui/Page/Page";
import { Toaster } from "@/shared/ui/toast";

export default function registration() {
  return (
    <div className={"bg-background flex min-h-screen"}>
      <Page className={"flex items-center"}>
        <RegisterUser className={"w-[500px]"} />
      </Page>
      <Toaster />
    </div>
  );
}
