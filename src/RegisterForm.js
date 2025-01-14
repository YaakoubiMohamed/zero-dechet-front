import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";

const schema = yup.object({
  name: yup.string().required("Le nom est obligatoire"),
  email: yup
    .string()
    .required("L'e-mail est obligatoire")
    .email("Adresse e-mail invalide"),
  password: yup
    .string()
    .required("Le mot de passe est obligatoire")
    .min(6, "Au moins 6 caractères"),
  confirmPassword: yup
    .string()
    .required("La confirmation du mot de passe est obligatoire")
    .oneOf([yup.ref("password"), null], "Les mots de passe doivent correspondre"),
});

function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("127.0.0.1:3000/api/inscription", data); // Replace with your backend endpoint
      alert("Inscription réussie !");
      console.log(response.data);
    } catch (error) {
      alert("Échec de l'inscription !");
      console.error(error);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <Typography variant="h4" mb={2}>Inscription</Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%", maxWidth: "400px" }}>
        <TextField
          fullWidth
          margin="normal"
          label="Nom"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          fullWidth
          margin="normal"
          label="E-mail"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Mot de passe"
          type="password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Confirmer le mot de passe"
          type="password"
          {...register("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          S'inscrire
        </Button>
      </form>
    </Box>
  );
}

export default RegistrationForm;