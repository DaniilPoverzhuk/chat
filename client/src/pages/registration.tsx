import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import { Container, Grid, Link, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import * as AuthService from "@/service/auth";

import { setData } from "@/lib/store/slices/user";
import { useAppDispatch } from "@/lib/store";

import { IError } from "@/axios/types";

import "react-toastify/dist/ReactToastify.css";

import { ROUTES } from "@/routes";

const formSchema = z
  .object({
    email: z.string().email("Некорректный email"),
    username: z.string().min(3, "Слишком короткое имя"),
    password: z.string().min(1, "Введите пароль"),
    confirm_password: z.string().min(1, "Введите пароль еще раз"),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Пароли не совпадают",
  });

type FormSchema = z.infer<typeof formSchema>;

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<FormSchema>({ resolver: zodResolver(formSchema) });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState<boolean>(false);

  const onSubmit = async (formData: FormSchema) => {
    try {
      const { data } = await AuthService.registration(formData);

      dispatch(setData(data.user));

      setLoading(true);
      toast.success("Регистрация прошла успешно!");

      setTimeout(() => {
        navigate(ROUTES.HOME);
      }, 2000);
    } catch (err) {
      const errorObject = err as AxiosError<IError>;

      toast.error(errorObject.response?.data.message);
    }
  };

  useEffect(() => {
    setFocus("email");
  }, []);

  return (
    <Container maxWidth="xs">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction={"column"} alignItems={"flex-start"} gap={2}>
          <TextField
            {...register("email")}
            label={"Электронная почта"}
            variant="outlined"
            size="small"
            error={Boolean(errors.email!)}
            helperText={Boolean(errors.email!) && errors.email?.message}
            fullWidth
          />
          <TextField
            {...register("username")}
            label={"Имя пользователя"}
            variant="outlined"
            size="small"
            error={Boolean(errors.username!)}
            helperText={Boolean(errors.username!) && errors.username?.message}
            fullWidth
          />
          <TextField
            {...register("password")}
            label={"Пароль"}
            variant="outlined"
            size="small"
            type="password"
            error={Boolean(errors.password!)}
            helperText={Boolean(errors.password!) && errors.password?.message}
            fullWidth
          />
          <TextField
            {...register("confirm_password")}
            label={"Введите пароль еще раз"}
            variant="outlined"
            size="small"
            type="password"
            error={Boolean(errors.confirm_password!)}
            helperText={
              Boolean(errors.confirm_password!) &&
              errors.confirm_password?.message
            }
            fullWidth
          />
          <LoadingButton
            loading={isLoading}
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            fullWidth
            sx={{ maxWidth: "200px" }}
          >
            Войти
          </LoadingButton>
          <Link component={RouterLink} to={ROUTES.LOGIN}>
            У меня уже есть аккаунт
          </Link>
        </Grid>
        <ToastContainer />
      </form>
    </Container>
  );
};

export default Login;
