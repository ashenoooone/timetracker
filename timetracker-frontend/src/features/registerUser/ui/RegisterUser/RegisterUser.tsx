import React, { ChangeEvent, useCallback, useEffect } from "react";
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
import { createRegisterModel } from "../../model/store";
import { useUnit } from "effector-react";
import { toast } from "@/shared/ui/toast";

const model = createRegisterModel();

interface RegisterUserProps {
  className?: string;
}

export const RegisterUser = (props: RegisterUserProps) => {
  const { className = "" } = props;

  const [
    $email,
    $errors,
    $password,
    $confirmPassword,
    $formValid,
    changeEmailEv,
    changePasswordEv,
    changeConfirmPasswordEv,
    $pending,
    registerUserEv,
    $serverError,
  ] = useUnit([
    model.$email,
    model.$errors,
    model.$password,
    model.$confirmPassword,
    model.$formValid,
    model.changeEmailEv,
    model.changePasswordEv,
    model.changeConfirmPasswordEv,
    model.$pending,
    model.registerUserEv,
    model.$serverError,
  ]);

  const onEmailChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      changeEmailEv(e.target.value);
    },
    [changeEmailEv]
  );

  const onRegisterClick = useCallback(() => {
    registerUserEv();
  }, [registerUserEv]);

  const onPasswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      changePasswordEv(e.target.value);
    },
    [changePasswordEv]
  );

  const onConfirmPasswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      changeConfirmPasswordEv(e.target.value);
    },
    [changeConfirmPasswordEv]
  );

  useEffect(() => {
    if ($serverError) {
      toast({
        variant: "destructive",
        title: "Ошибка при регистрации",
        description: $serverError,
      });
    }
  }, [$serverError]);

  return (
    <Card className={className}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Регистрация</CardTitle>
        <CardDescription>Заполните поля</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Почта</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            onChange={onEmailChange}
            value={$email}
          />
          <Typography className="text-red-500" variant={"p"} affects={"muted"}>
            {$errors.email && $errors.email}
          </Typography>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Пароль</Label>
          <Input
            value={$password}
            id="password"
            type="password"
            onChange={onPasswordChange}
          />
          <Typography className="text-red-500" variant={"p"} affects={"muted"}>
            {$errors.password && $errors.password}
          </Typography>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Подтверждение пароля</Label>
          <Input
            value={$confirmPassword}
            id="password"
            type="password"
            onChange={onConfirmPasswordChange}
          />
          <Typography className="text-red-500" variant={"p"} affects={"muted"}>
            {$errors.confirmPassword && $errors.confirmPassword}
          </Typography>
        </div>
      </CardContent>
      <CardFooter className={"flex flex-col"}>
        <Button
          disabled={$pending || !$formValid}
          className="w-full"
          onClick={onRegisterClick}
        >
          {$pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Зарегистрироваться
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
            Есть аккаунт?
          </Typography>
        </div>
        <Button variant={"link"}>
          <Link href={"login"}>Авторизация</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
