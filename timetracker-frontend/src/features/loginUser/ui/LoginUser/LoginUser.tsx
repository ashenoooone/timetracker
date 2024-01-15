import React, { useCallback, useEffect, useState } from "react";
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
import { useRouter } from "next/router";
import { IAxiosError } from "@/shared/api/types";

interface LoginUserProps {
  className?: string;
}

export const LoginUser = (props: LoginUserProps) => {
  const { className = "" } = props;
  const { isLoading, response, sendRequest, error } = useRequest<
    any,
    IAxiosError
  >();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onLoginClick = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      await sendRequest({
        method: "POST",
        url: "/auth/login",
        data: {
          email,
          password,
        },
      });
    },
    [email, password, sendRequest]
  );

  useEffect(() => {
    if (error) {
      toast({
        title: "ОШИБКА",
        description: error?.response?.data.message ?? "Непредвиденная ошибка",
        variant: "destructive",
        duration: 2000,
      });
    }
  }, [error, toast]);

  useEffect(() => {
    if (response?.status === 201) {
      router.push("/profile");
    }
  }, [response?.status, router]);

  const handleEmailChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    []
  );

  const handlePasswordChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    []
  );

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
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Пароль</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
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
        <Button type={"button"} variant={"link"}>
          <Link href={"registration"}>Регистрация</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
