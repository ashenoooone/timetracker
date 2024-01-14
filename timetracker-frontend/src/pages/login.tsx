import React from "react";
import { LoginUser } from "@/features/loginUser";
import { Page } from "@/shared/ui/Page/Page";

interface loginProps {}

export default function LoginPage(props: loginProps) {
  return (
    <div className={"bg-background flex min-h-screen"}>
      <Page className={"flex items-center"}>
        <LoginUser className={"w-[500px]"} />
      </Page>
    </div>
  );
}
