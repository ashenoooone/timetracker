import React, { memo } from "react";
import { cn } from "@/shared/lib";
import Link from "next/link";

interface LogoProps {
  className?: string;
  asLink?: boolean;
  to?: string;
}

export const Logo = memo((props: LogoProps) => {
  const { className = "", asLink, to = "/" } = props;
  const content = (
    <h1 className={cn(className, 'font-["Sora"] text-xl')}>
      <span className={"font-bold"}>Time</span>
      <span className={"font-medium"}>Tracking</span>
    </h1>
  );

  if (asLink && to) {
    return <Link href={to}>{content}</Link>;
  }

  return content;
});
