import React from "react";

interface UserProps {
  className?: string;
}

export const User = (props: UserProps) => {
  const { className = "" } = props;
  return <div className={""}>{1}</div>;
};
