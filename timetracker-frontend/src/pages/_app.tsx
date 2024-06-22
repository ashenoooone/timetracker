import "@/app/_src/styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "@/widgets/laout";
import React from "react";
import { EffectorNext } from "@effector/next";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <EffectorNext values={pageProps.values}>
        <Layout>
          <Component />
        </Layout>
      </EffectorNext>
    </main>
  );
}
