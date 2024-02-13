import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { Grid, Link, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import * as AuthService from "@/service/auth";

import { setData } from "@/lib/store/slices/user";

import styles from "./index.module.scss";
import "react-toastify/dist/ReactToastify.css";

import { ROUTES } from "@/routes";
import { useAppDispatch } from "@/lib/store";
import List from "@/ui/List";
import { ID } from "@/types";

const formSchema = z
  .object({
    email: z.string().email("Некорректный email"),
    username: z.string().min(3, "Слишком короткое имя"),
    password: z.string().min(1, { message: "Введите пароль" }),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Пароли не совпадают",
  });

type FormSchema = z.infer<typeof formSchema>;

type TypeField = "text" | "password";

interface IField extends ID {
  type: TypeField;
  name: keyof FormSchema;
  label: string;
}

const fields: IField[] = [
  {
    id: 0,
    type: "text",
    name: "email",
    label: "Электронная почта",
  },
  {
    id: 1,
    type: "text",
    name: "username",
    label: "Имя пользователя",
  },
  {
    id: 2,
    type: "password",
    name: "email",
    label: "Пароль",
  },

  {
    id: 3,
    type: "password",
    name: "confirm_password",
    label: "Введите пароль еще раз",
  },
];

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

      dispatch(setData(data.user));

      setLoading(true);
      toast.success("Регистрация прошла успешно!");

      setTimeout(() => {
        navigate(ROUTES.HOME);
      }, 2000);
    } catch (err) {
      toast.error("При регистрации произошла ошибка :(");
    }
  };

  useEffect(() => {
    setFocus("email");
  }, []);

  return (
    <form className={styles.root} onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction={"column"} alignItems={"flex-start"} gap={2}>
        <List<IField>
          list={fields}
          renderItem={(field) => (
            <TextField
              {...register(field.name)}
              label={field.label}
              variant="outlined"
              size="small"
              error={Boolean(errors[field.name]!)}
              helperText={
                Boolean(errors[field.name]!) && errors[field.name]?.message
              }
            />
          )}
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
