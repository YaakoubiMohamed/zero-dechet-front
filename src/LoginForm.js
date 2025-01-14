import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";

const schema = yup.object({
  email: yup.string().required("L'e-mail est obligatoire").email("Adresse e-mail invalide"),
  password: yup.string().required("Le mot de passe est obligatoire").min(6, "Au moins 6 caractères"),
});

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("127.0.0.1:3000/api/connexion", data); // Replace with your backend endpoint
      alert("Login successful!");
      console.log(response.data);
    } catch (error) {
      alert("Login failed!");
      console.error(error);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <Typography variant="h4" mb={2}>Login</Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%", maxWidth: "400px" }}>
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
        <a href="/register">Vous n'avez pas encore de compte ? Inscrivez-vous dès maintenant !</a>
      </form>
    </Box>
  );
}

export default LoginForm;
