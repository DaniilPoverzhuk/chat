import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { Grid, Link, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import styles from "./index.module.scss";
import "react-toastify/dist/ReactToastify.css";

import { ROUTES } from "@/routes";

const formSchema = z.object({
  username: z.string().min(1, { message: "Имя пользователя слишком короткое" }),
  email: z.string().email("Некорректный email"),
  password: z.string().min(1, { message: "Введите пароль" }),
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
  const [isLoading, setLoading] = useState<boolean>(false);

  const onSubmit = (data: any) => {
    setLoading(true);
    toast.success("Авторизация прошла успешно!");

    setTimeout(() => {
      navigate(ROUTES.HOME);
    }, 2000);
  };

  useEffect(() => {
    setFocus("username");
  }, []);

  return (
    <form className={styles.root} onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction={"column"} alignItems={"flex-start"} gap={2}>
        <TextField
          {...register("username")}
          label="Имя пользователя"
          variant="outlined"
          size="small"
          error={Boolean(errors.username!)}
          helperText={Boolean(errors.email!) && errors.username?.message}
        />
        <TextField
          {...register("email")}
          label="Электронная почта"
          variant="outlined"
          size="small"
          error={Boolean(errors.email!)}
          helperText={Boolean(errors.email!) && errors.email?.message}
        />
        <TextField
          {...register("password")}
          type="password"
          label="Пароль"
          variant="outlined"
          size="small"
          error={Boolean(errors.password!)}
          helperText={Boolean(errors.email!) && errors.password?.message}
        />
        <LoadingButton
          loading={isLoading}
          variant="contained"
          onClick={handleSubmit(onSubmit)}
        >
          Войти
        </LoadingButton>
        <Link component={RouterLink} to={ROUTES.REGISTRATION}>
          Зарегестрироваться
        </Link>
      </Grid>
      <ToastContainer />
    </form>
  );
};

export default Login;
