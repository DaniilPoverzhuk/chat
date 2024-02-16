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

import { IError } from "@/axios/types";

import { setAuthor } from "@/lib/store/slices/user";
import { useAppDispatch } from "@/lib/store";

import "react-toastify/dist/ReactToastify.css";

import { ROUTES } from "@/routes";

const formSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(1, "Введите пароль"),
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
      const { data } = await AuthService.login(formData);

      dispatch(setAuthor(data.user));

      setLoading(true);
      toast.success("Аутентификация прошла успешно!");

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
            label="Электронная почта"
            variant="outlined"
            size="small"
            error={Boolean(errors.email!)}
            helperText={Boolean(errors.email!) && errors.email?.message}
            fullWidth
          />
          <TextField
            {...register("password")}
            label="Пароль"
            variant="outlined"
            size="small"
            type="password"
            error={Boolean(errors.password!)}
            helperText={Boolean(errors.password!) && errors.password?.message}
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
          <Link component={RouterLink} to={ROUTES.REGISTRATION}>
            Зарегестрироваться
          </Link>
        </Grid>
        <ToastContainer />
      </form>
    </Container>
  );
};

export default Login;
