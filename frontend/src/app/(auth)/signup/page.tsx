"use client";
import React from "react";
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupDataInterface, SignupSchema } from "@/app/utils";
import { Toaster, toast } from 'sonner';
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/redux/hooks";
import { signUpUser } from "@/app/redux/slices/user.slice";


export default function SignupPage() {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<SignupDataInterface>({
    resolver: zodResolver(SignupSchema),
  });
  const router = useRouter();

  const submitData = async (data: SignupDataInterface) => {
  try {
    const res = await dispatch(signUpUser(data)).unwrap();
    toast.success("SignUp successful")
    setTimeout(() => {  
      router.push("/login");
    }, 1000);
  } catch (error:any) {

    toast.error(error?.message || "signup failed. Try again.");
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
          Sign Up
        </Typography>
        {errors && (
          <Typography variant="body2" color="error.main" align="center">
            {errors?.name?.message || errors?.email?.message || errors?.password?.message}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit(submitData)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            autoComplete="name"
            autoFocus
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            autoComplete="email"
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
            Sign Up
          </Button>
          <Link href="/login" passHref>
            <Typography variant="body2" color="text.secondary" align="center">
              Already have an account? Login
            </Typography>
          </Link>
        </Box>
      </Box>
      <Toaster richColors position="top-right" />
    </Container>
  );
}
