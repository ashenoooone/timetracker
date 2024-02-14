import { Page } from "@/shared/ui/Page/Page";
import { RegisterUser } from "@/features/registerUser";
import { Toaster } from "@/shared/ui/toast";
import React, { memo, useEffect } from "react";
import { useUnit } from "effector-react/compat";
import { useRouter } from "next/router";
import { routerChangedEv } from "@/shared/lib/routerModel";

export const RegistrationPage = memo(() => {
  const [routerChange] = useUnit([routerChangedEv]);
  const router = useRouter();

  useEffect(() => {
    routerChange(router);
  }, []);

  return (
    <div className={"bg-background flex min-h-screen"}>
      <Page className={"flex items-center"}>
        <RegisterUser className={"w-[500px]"} />
      </Page>
      <Toaster />
    </div>
  );
});
