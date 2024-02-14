import React from "react";
import { GetServerSideProps } from "next";
import { checkUserSsr } from "@/entities/user/api/check-user-ssr";
import { LoginPage } from "@/pages-composite/login";

const Index = () => {
  return <LoginPage />;
};

export const getServerSideProps = (async (context) => {
  return checkUserSsr(context, "authorized");
}) satisfies GetServerSideProps;

export default Index;
