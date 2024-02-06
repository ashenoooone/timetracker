import React, { memo } from "react";
import { cn } from "@/shared/lib";

interface FooterProps {
  className?: string;
}

export const Footer = memo((props: FooterProps) => {
  const { className = "" } = props;
  return <div className={cn("", className)}>{1}</div>;
});
