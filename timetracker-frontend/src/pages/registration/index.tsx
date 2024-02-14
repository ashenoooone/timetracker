import React from "react";
import { GetServerSideProps } from "next";
import { checkUserSsr } from "@/entities/user/api/check-user-ssr";
import { RegistrationPage } from "@/pages-composite/registration";

const Index = () => {
  return <RegistrationPage />;
};

export const getServerSideProps = (async (context) => {
  return checkUserSsr(context, "authorized");
}) satisfies GetServerSideProps;

export default Index;
