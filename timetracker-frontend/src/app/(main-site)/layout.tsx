import React from "react";
import { EffectorNext } from "@effector/next";
import "@/app/_src/styles/globals.css";
import { Header } from "@/widgets/laout/ui/header";
import { Footer } from "@/widgets/laout/ui/footer";
import { Page } from "@/shared/ui/page";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <EffectorNext>
        <body className={"min-h-screen flex flex-col gap-2"}>
          <Header />
          <Page>{children}</Page>
          <Footer />
        </body>
      </EffectorNext>
    </html>
  );
}
