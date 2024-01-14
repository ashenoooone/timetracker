import React, { ReactNode } from "react";
import { cn } from "@/shared/lib/";

interface PageProps {
  className?: string;
  children?: ReactNode;
}

export const Page = (props: PageProps) => {
  const { className = "", children } = props;
  return (
    <div
      className={cn(
        "max-w-[1280px] min-w-[320px] px-4 py-2 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};
