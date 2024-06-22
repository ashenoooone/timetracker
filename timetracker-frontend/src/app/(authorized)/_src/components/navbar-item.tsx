import { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/shared/lib";
import { usePathname } from "next/navigation";

interface NavbarItemProps {
  className?: string;
  children?: ReactNode;
  href: string;
}
export const NavbarItem = (props: NavbarItemProps) => {
  const { className, children, href } = props;
  const pathname = usePathname();

  return (
    <Link
      className={cn(
        className,
        "flex w-full gap-2 items-center py-1 px-2 hover:bg-white/10 transition-all",
        {
          "bg-primary/50": pathname === href,
        }
      )}
      href={href}
    >
      {children}
    </Link>
  );
};
