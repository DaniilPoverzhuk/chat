import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import LoadingButton from "@mui/lab/LoadingButton";
import { Box, TextField } from "@mui/material";

import CreateGroupContext from "@/context/create-group";

const formSchema = z.object({
  name_group: z
    .string()
    .min(3, "Имя группы должно состоять минимум из 3 символов"),
});

type TypeSchema = z.infer<typeof formSchema>;

const Name = () => {
  const { setData, data, changeStepHandler, isLoading } =
    useContext(CreateGroupContext)!;
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<TypeSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<TypeSchema> = (data) => {
    setData((prev) => {
      return {
        ...prev,
        name: data.name_group,
      };
    });

    changeStepHandler();
  };

  useEffect(() => {
    if (!inputRef.current) return;

    inputRef.current.value = data.name;
  }, [inputRef]);

  useEffect(() => {
    setFocus("name_group");
  }, []);

  return (
    <Box
      component={"form"}
      display={"flex"}
      flexDirection={"column"}
      gap={2}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        {...register("name_group")}
        error={Boolean(errors.name_group)}
        helperText={errors.name_group?.message}
        placeholder="Введите имя группы"
        size="small"
        inputRef={inputRef}
      />
      <LoadingButton
        loading={isLoading}
        sx={{ alignSelf: "flex-start" }}
        variant="contained"
        type="submit"
      >
        Продолжить
      </LoadingButton>
    </Box>
  );
};

export default Name;
