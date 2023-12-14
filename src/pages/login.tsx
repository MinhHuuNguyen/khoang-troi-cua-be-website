import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Image from "next/image";
import logoNoBackground from "@public/ktcb_logo_no_background.png";
import Link from "next/link";

export default function Login() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Container component="main" maxWidth="sm">
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
          onSubmit={handleSubmit}
          noValidate
          maxWidth={320}
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            size="small"
            required
            fullWidth
            id="email"
            label="Tài khoản"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            size="small"
            required
            fullWidth
            name="password"
            label="Mật khẩu"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: "#3b4b95" }}
          >
            Đăng nhập
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
