import React from "react";
import { redirect } from "next/navigation";
import { $user, User } from "@/entities/user";
import { paths } from "@/shared/consts/paths";
import { EffectorNext } from "@effector/next";
import { serialize } from "effector";
import { checkUser } from "@/entities/user/api/check-user-ssr";

const ProfilePage = async () => {
  const user_scope = await checkUser({ banned_status: "not_authorized" });
  const user = user_scope.getState($user);

  if (!user) redirect(paths.login);

  return (
    <EffectorNext values={serialize(user_scope)}>
      <User profile={user} />
    </EffectorNext>
  );
};

export default ProfilePage;
