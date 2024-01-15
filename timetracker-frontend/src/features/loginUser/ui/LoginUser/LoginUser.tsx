import React, { useCallback, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Typography } from "@/shared/ui/typography";
import Link from "next/link";
import useRequest from "@/shared/hooks/useRequest";
import { useToast } from "@/shared/ui/toast";
import { Loader2 } from "lucide-react";

interface LoginUserProps {
  className?: string;
}

export const LoginUser = (props: LoginUserProps) => {
  const { className = "" } = props;
  const { isLoading, response, sendRequest, error } = useRequest();
  const { toast } = useToast();

  const onLoginClick = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      await sendRequest({
        method: "POST",
        url: "login",
      });
    },
    [sendRequest]
  );

  useEffect(() => {
    if (error) {
      toast({
        title: "ОШИБКА",
        description: error.message,
        variant: "destructive",
        duration: 2000,
      });
    }
  }, [error, toast]);

  return (
    <Card className={className}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Авторизация</CardTitle>
        <CardDescription>Заполните поля</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>
      </CardContent>
      <CardFooter className={"flex flex-col"}>
        <Button disabled={isLoading} className="w-full" onClick={onLoginClick}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Авторизоваться
        </Button>
        <div className={"relative w-full flex justify-center mt-4"}>
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-primary"></span>
          </div>
          <Typography
            className={"relative bg-background px-2"}
            affects={"small"}
            variant={"p"}
          >
            Нет аккаунта?
          </Typography>
        </div>
        <Button variant={"link"}>
          <Link href={"/registration"}>Регистрация</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
