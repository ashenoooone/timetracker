import React, { ReactNode } from "react";
import "@/app/_src/styles/globals.css";
import { EffectorNext } from "@effector/next";
import { Navbar } from "./_src/components/navbar";
import { Page } from "@/shared/ui/page";

interface AuthorizedLayoutProps {
  children?: ReactNode;
}

const AuthorizedLayout = (props: AuthorizedLayoutProps) => {
  const { children } = props;
  return (
    <html lang="en">
      <EffectorNext>
        <body>
          <Page
            className={
              "flex-row min-h-screen px-0 gap-2 max-w-[1280px] mx-auto"
            }
          >
            <Navbar className={"basis-1/5"} />
            <div className={"basis-4/5 flex-grow p-4"}>{children}</div>
          </Page>
        </body>
      </EffectorNext>
    </html>
  );
};

export default AuthorizedLayout;
