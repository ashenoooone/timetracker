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
        "max-w-[1280px] px-2 mx-auto w-full flex flex-col flex-grow flex-shrink-0 box-border gap-sm",
        className
      )}
    >
      {children}
    </div>
  );
};
