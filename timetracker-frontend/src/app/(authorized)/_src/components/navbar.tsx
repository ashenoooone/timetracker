"use client";
import React, { memo } from "react";
import { cn } from "@/shared/lib";
import { MdAccessTimeFilled, MdAvTimer, MdFolder } from "react-icons/md";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { useUnit } from "effector-react";
import { $user, UserType } from "@/entities/user";
import { Typography } from "@/shared/ui/typography";
import { paths } from "@/shared/consts/paths";
import { NavbarItem } from "@/app/(authorized)/_src/components/navbar-item";
import { IoMdAnalytics } from "react-icons/io";
import { BiSolidReport } from "react-icons/bi";
import { FaUser } from "react-icons/fa";

interface NavbarProps {
  className?: string;
}

const LeftPanel = (props: { user?: UserType | null }) => {
  return (
    <div className={cn("bg-primary flex flex-col justify-between h-full p-2")}>
      <div
        className={
          "h-7 w-7 rounded-full bg-secondary flex items-center justify-center"
        }
      >
        <MdAvTimer className={"text-primary w-6 h-6"} />
      </div>
      <div>
        <Avatar className={"text-primary w-7 h-7 cursor-pointer"}>
          <AvatarFallback>{props.user?.email.slice(0, 2)}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

const RightPanel = () => {
  return (
    <div className={"w-full"}>
      <div>
        <Typography variant={"p"} affects={"muted"} className={"p-2 pb-1"}>
          Профиль
        </Typography>
        <NavbarItem href={paths.profile}>
          <FaUser />
          Профиль
        </NavbarItem>
      </div>
      <div>
        <Typography variant={"p"} affects={"muted"} className={"p-2 pb-1"}>
          Трекер времени
        </Typography>
        <NavbarItem href={paths.tracker}>
          <MdAccessTimeFilled />
          Трекер
        </NavbarItem>
        <NavbarItem href={paths.projects}>
          <MdFolder />
          Проекты
        </NavbarItem>
      </div>
      <div>
        <Typography variant={"p"} affects={"muted"} className={"p-2 pb-1"}>
          Аналитика
        </Typography>
        <NavbarItem href={paths.reports}>
          <BiSolidReport />
          Отчеты
        </NavbarItem>
        <NavbarItem href={paths.analytics}>
          <IoMdAnalytics />
          Аналитика
        </NavbarItem>
      </div>
    </div>
  );
};

export const Navbar = memo((props: NavbarProps) => {
  const { className = "" } = props;
  const user = useUnit($user);

  return (
    <div
      className={cn(
        className,
        "w-full h-auto flex bg-primary/90 text-secondary"
      )}
    >
      <LeftPanel user={user} />
      <RightPanel />
    </div>
  );
});
