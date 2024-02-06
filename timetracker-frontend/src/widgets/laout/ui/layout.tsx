import React, { ReactNode } from "react";
import { Header } from "./header";
import { Footer } from "./footer";

interface LayoutProps {
  className?: string;
  children?: ReactNode;
}

export const Layout = (props: LayoutProps) => {
  const { className = "", children } = props;
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
