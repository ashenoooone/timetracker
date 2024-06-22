"use client";
import React, { memo } from "react";
import { cn } from "@/shared/lib";
import { useUnit } from "effector-react";
import { $user, UserType } from "@/entities/user";
import { Logo } from "@/shared/ui/logo";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import Link from "next/link";
import { paths } from "@/shared/consts/paths";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { RxExit, RxHome } from "react-icons/rx";

interface headerProps {
  className?: string;
}

interface UserAvatarProps {
  user: UserType;
  className?: string;
}
const UserAvatar = (props: UserAvatarProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback>{props.user.email.slice(0, 2)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={props.className}>
        <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link className="flex items-center gap-2 w-full" href={paths.profile}>
            <RxHome className="w-4 h-4" />
            Профиль
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="flex items-center gap-2 w-full" href={paths.login}>
            <RxExit className="w-4 h-4" />
            Выйти
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const Header = memo((props: headerProps) => {
  const { className = "" } = props;
  const user = useUnit($user);
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-gray-300 bg-gradient-to-b from-zinc-200 py-2 px-5 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:w-auto lg:border",
        className
      )}
    >
      <div
        className={"flex justify-between items-center max-w-[1280px] mx-auto"}
      >
        <Logo asLink />
        <div>
          {user ? (
            <UserAvatar user={user} />
          ) : (
            <Link href={paths.login}>Авторизоваться</Link>
          )}
        </div>
      </div>
    </header>
  );
});
