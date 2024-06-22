"use client";
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
import { Loader2 } from "lucide-react";
import { createLoginModel } from "../../model/store";
import { useUnit } from "effector-react";
import { toast } from "@/shared/ui/toast";
import { routerChangedEv } from "@/shared/lib/routerModel";
import { useRouter } from "next/navigation";

interface LoginUserProps {
  className?: string;
}

const model = createLoginModel();
export const LoginUser = (props: LoginUserProps) => {
  const [routerChange] = useUnit([routerChangedEv]);
  const router = useRouter();

  useEffect(() => {
    if (router) {
      routerChange(router);
    }
  }, [router, routerChange]);

  const [
    $email,
    emailChangeEv,
    passwordChangeEv,
    $password,
    loginEv,
    $pending,
    $error,
  ] = useUnit([
    model.$email,
    model.emailChangeEv,
    model.passwordChangeEv,
    model.$password,
    model.loginEv,
    model.$pending,
    model.$error,
  ]);
  const { className = "" } = props;

  const handleEmailChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      emailChangeEv(event.target.value);
    },
    [emailChangeEv]
  );

  const handlePasswordChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      passwordChangeEv(event.target.value);
    },
    [passwordChangeEv]
  );

  const onSubmit = useCallback(() => {
    loginEv({
      email: $email,
      password: $password,
    });
  }, [$email, $password, loginEv]);

  useEffect(() => {
    if ($error) {
      toast({
        variant: "destructive",
        title: "Ошибка при авторизации",
        description: $error,
      });
    }
  }, [$error]);

  return (
    <Card className={className}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Авторизация</CardTitle>
        <CardDescription>Заполните поля</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Почта</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={$email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Пароль</Label>
          <Input
            id="password"
            type="password"
            value={$password}
            onChange={handlePasswordChange}
          />
        </div>
      </CardContent>
      <CardFooter className={"flex flex-col"}>
        <Button onClick={onSubmit} disabled={false} className="w-full">
          {$pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
        <Button type={"button"} variant={"link"}>
          <Link href={"registration"}>Регистрация</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
