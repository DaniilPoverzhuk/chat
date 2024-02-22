import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import { Container, Grid, Link, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import * as AuthService from "@/service/auth";

import { setAuthor } from "@/lib/store/slices/user";
import { useAppDispatch } from "@/lib/store";

import { IError } from "@/axios/types";

import { ROUTES } from "@/routes";

import useModal from "@/hooks/useModal";

import Modal from "@/ui/Modal";

import ModalContent from "./ModalContent";
import AvatarButton from "./AvatarButton";

import "react-toastify/dist/ReactToastify.css";

const formSchema = z
  .object({
    email: z.string().email("Некорректный email"),
    username: z.string().min(3, "Слишком короткое имя"),
    password: z.string().min(5, "Пароль должен состоять минимум из 5 символов"),
    confirm_password: z.string().min(5, "Введите пароль еще раз"),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Пароли не совпадают",
  });

type FormSchema = z.infer<typeof formSchema>;

const DEFAULT_AVATAR = "/images/avatars/avatar-1.svg";

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<FormSchema>({ resolver: zodResolver(formSchema) });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isVisible, showModal, closeModal } = useModal();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string>(DEFAULT_AVATAR);

  const onSubmit = async (formData: FormSchema) => {
    try {
      const { data } = await AuthService.registration({ ...formData, avatar });

      dispatch(setAuthor({ ...data.user, avatar, isOnline: true }));

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

  const changeAvatar = (src: string) => {
    setAvatar(src);
    closeModal();
  };

  useEffect(() => {
    setFocus("email");
  }, []);

  return (
    <>
      <Container maxWidth="xs">
        <Modal isVisible={isVisible} onClose={closeModal}>
          <ModalContent changeAvatar={changeAvatar} />
        </Modal>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            direction={"column"}
            alignItems={"flex-start"}
            gap={2}
          >
            <AvatarButton showModal={showModal} src={avatar} />
            <TextField
              {...register("email")}
              fullWidth
              label={"Электронная почта"}
              variant="outlined"
              size="small"
              error={Boolean(errors.email!)}
              helperText={Boolean(errors.email!) && errors.email?.message}
            />
            <TextField
              {...register("username")}
              fullWidth
              label={"Имя пользователя"}
              variant="outlined"
              size="small"
              error={Boolean(errors.username!)}
              helperText={Boolean(errors.username!) && errors.username?.message}
            />
            <TextField
              {...register("password")}
              fullWidth
              label={"Пароль"}
              variant="outlined"
              size="small"
              type="password"
              error={Boolean(errors.password!)}
              helperText={Boolean(errors.password!) && errors.password?.message}
            />
            <TextField
              {...register("confirm_password")}
              fullWidth
              label={"Введите пароль еще раз"}
              variant="outlined"
              size="small"
              type="password"
              error={Boolean(errors.confirm_password!)}
              helperText={
                Boolean(errors.confirm_password!) &&
                errors.confirm_password?.message
              }
            />
            <LoadingButton
              fullWidth
              loading={isLoading}
              variant="contained"
              type="submit"
              onClick={handleSubmit(onSubmit)}
              sx={{ maxWidth: "200px" }}
            >
              Войти
            </LoadingButton>
            <Link component={RouterLink} to={ROUTES.LOGIN}>
              У меня уже есть аккаунт
            </Link>
          </Grid>
        </form>
      </Container>
      <ToastContainer />
    </>
  );
};

export default Login;
