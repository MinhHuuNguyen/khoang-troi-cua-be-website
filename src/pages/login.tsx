import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import logoNoBackground from "@public/ktcb_logo_no_background.png";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/shared/inputs";
import { zodResolver } from "@hookform/resolvers/zod";

import { notEmptyMessage } from "@/utils/common";
import { z } from "zod";

export const LoginInputSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: notEmptyMessage("Email"),
    })
    .email({
      message: "Email không hợp lệ",
    }),

  password: z.string().min(1, {
    message: "Mật khẩu không được bỏ trống",
  }),
});

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginInputSchema>>({
    resolver: zodResolver(LoginInputSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Container component="main" maxWidth="sm" className="mb-10">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "0.0625rem solid rgb(222, 226, 230)",
          boxShadow:
            "rgba(0, 0, 0, 0.05) 0px 0.0625rem 0.1875rem, rgba(0, 0, 0, 0.05) 0px 1.25rem 1.5625rem -0.3125rem, rgba(0, 0, 0, 0.04) 0px 0.625rem 0.625rem -0.3125rem",
          borderRadius: "8px",
          padding: "30px",
        }}
      >
        <Link href="/" className="flex items-center">
          <Box
            component="img"
            maxHeight={70}
            width={70}
            src={logoNoBackground.src}
            alt="logoNoBackground"
            loading="lazy"
          />
        </Link>
        <p className="text-[#292929] text-[28px] font-bold mt-4">
          Chào mừng đến với KTCB
        </p>
        <Box
          component="form"
          onSubmit={onSubmit}
          noValidate
          maxWidth={320}
          sx={{
            mt: 1,
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "100%",
          }}
        >
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                label={"Email"}
                fullWidth
                placeholder={"Nhập email"}
                value={value}
                onChange={onChange}
                error={!!errors.email?.message}
                helperText={errors.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                label={"Mật khẩu"}
                fullWidth
                placeholder={"Nhập mật khẩu"}
                type="password"
                value={value}
                onChange={onChange}
                error={!!errors.password?.message}
                helperText={errors.password?.message}
              />
            )}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: "#3b4b95" }}
            color="secondary"
          >
            Đăng nhập
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
