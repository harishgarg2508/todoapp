"use client";
import React, { use } from "react";
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { LoginDataInterface, LoginSchema } from "@/app/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from 'sonner';
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { loginUser } from "@/app/redux/slices/user.slice";


export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const user = useAppSelector(state => state.user);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginDataInterface>({
    resolver: zodResolver(LoginSchema)
  });

 const submitData = async (data: LoginDataInterface) => {
  try {
    const response = await dispatch(loginUser(data)).unwrap();
    toast.success('Login successful!');
    setTimeout(()=>{

      router.push("/dashboard");
    },1000)
  } catch (error) {
    toast.error('Login failed. Please check your credentials.');
  }
};


  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>

        <Box component="form" onSubmit={handleSubmit(submitData)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            autoComplete="email"
            autoFocus
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Link href="/signup" passHref>
            <Typography variant="body2" color="text.secondary" align="center">
              Don't have an account? Sign Up
            </Typography>
          </Link>
        </Box>
        <Toaster position="top-right" />
      </Box>
    </Container>
  );
}