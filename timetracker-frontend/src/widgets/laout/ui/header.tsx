import React, { memo } from "react";
import { cn } from "@/shared/lib";

interface headerProps {
  className?: string;
}

export const Header = memo((props: headerProps) => {
  const { className = "" } = props;

  return (
    <div
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    ></div>
  );
});
