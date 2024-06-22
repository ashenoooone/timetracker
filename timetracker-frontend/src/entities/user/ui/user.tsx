import React from "react";
import { cn } from "@/shared/lib";
import { ProfileHeader } from "./profile-header";
import { UserType } from "@/entities/user";

interface UserProps {
  className?: string;
  profile: UserType;
}

export const User = (props: UserProps) => {
  const { className = "", profile } = props;
  return (
    <div className={cn("", className)}>
      <ProfileHeader profile={profile} />
    </div>
  );
};
