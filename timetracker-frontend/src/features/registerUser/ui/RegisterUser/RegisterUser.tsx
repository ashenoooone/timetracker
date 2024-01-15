import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { Loader2, MailCheck } from "lucide-react";
import { IRegisterValidation } from "@/features/registerUser/validation/validation";
import { IAxiosError } from "@/shared/api/types";

interface RegisterUserProps {
  className?: string;
}

export const RegisterUser = (props: RegisterUserProps) => {
  const { className = "" } = props;
  const { isLoading, response, sendRequest, error } = useRequest<
    any,
    IAxiosError
  >();
  const [errors, setErrors] = useState<IRegisterValidation>({
    errors: {
      email: null,
      confirmPassword: null,
      password: null,
    },
  });
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const { toast } = useToast();

  const formInvalid = useMemo(() => {
    return Object.entries(errors.errors).some(([k, val]) => {
      return !!val;
    });
  }, [errors.errors]);

  const onRegisterClick = useCallback(async () => {
    await sendRequest({
      method: "post",
      url: "/auth/register",
      data: {
        email,
        password,
      },
    });
  }, [email, password, sendRequest]);

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
      toast({
        title: "Регистрация успешно завершена",
        description: (
          <div className={"flex items-center gap-4"}>
            <MailCheck />
            Подтверждение выслано на почту
          </div>
        ),
        duration: 2000,
      });
    }
  }, [error?.response?.data.message, response?.status, toast]);

  const onEmailChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(() => {
        return event.target.value;
      });
    },
    [errors.errors]
  );

  useEffect(() => {
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setErrors({
        errors: {
          ...errors.errors,
          email: "Введите корректный адрес электронной почты",
        },
      });
    } else {
      setErrors({
        errors: {
          ...errors.errors,
          email: null,
        },
      });
    }
  }, [email, errors.errors]);

  const getPasswordError = useCallback((password: string) => {
    // Минимальная длина пароля: 6 символов
    if (password.length < 6) {
      return "Минимальная длина пароля должна быть 6.";
    }

    // Проверка наличия хотя бы одной заглавной буквы
    if (!/[A-Z]/.test(password)) {
      return "Пароль должен иметь хотя бы одну заглавную букву";
    }

    // Проверка наличия хотя бы одной строчной буквы
    if (!/[a-z]/.test(password)) {
      return "Пароль должен иметь хотя бы одной строчную букву.";
    }

    // Проверка наличия хотя бы одной цифры
    if (!/\d/.test(password)) {
      return "Пароль должен содержать хотя бы одну цифру.";
    }

    // Проверка наличия хотя бы одного специального символа
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return 'Пароль должен содержать хотя бы один специальный символ (!@#$%^&*(),.?":{}|<>)';
    }

    // Если все критерии выполнены, пароль считается валидным
    return "";
  }, []);

  const onPasswordChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(() => {
        return event.target.value;
      });
    },
    []
  );

  useEffect(() => {
    const passwordError = getPasswordError(password);
    if (passwordError.length > 0) {
      setErrors({
        errors: {
          ...errors.errors,
          password: passwordError,
        },
      });
    } else {
      setErrors({
        errors: {
          ...errors.errors,
          password: null,
        },
      });
    }
  }, [errors.errors, getPasswordError, password]);

  const onConfirmPasswordChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(() => {
        return event.target.value;
      });
    },
    []
  );

  useEffect(() => {
    if (confirmPassword !== password) {
      setErrors({
        errors: {
          ...errors.errors,
          confirmPassword: "Пароли должны совпадать",
        },
      });
    } else {
      setErrors({
        errors: {
          ...errors.errors,
          confirmPassword: null,
        },
      });
    }
  }, [confirmPassword, errors.errors, password]);

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
            value={email}
          />
          <Typography className="text-red-500" variant={"p"} affects={"muted"}>
            {errors.errors.email && errors.errors.email}
          </Typography>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Пароль</Label>
          <Input
            value={password}
            id="password"
            type="password"
            onChange={onPasswordChange}
          />
          <Typography className="text-red-500" variant={"p"} affects={"muted"}>
            {errors.errors.password && errors.errors.password}
          </Typography>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Подтверждение пароля</Label>
          <Input
            value={confirmPassword}
            id="password"
            type="password"
            onChange={onConfirmPasswordChange}
          />
          <Typography className="text-red-500" variant={"p"} affects={"muted"}>
            {errors.errors.confirmPassword && errors.errors.confirmPassword}
          </Typography>
        </div>
      </CardContent>
      <CardFooter className={"flex flex-col"}>
        <Button
          disabled={isLoading || formInvalid}
          className="w-full"
          onClick={onRegisterClick}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
          <Link href={"/login"}>Авторизация</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
