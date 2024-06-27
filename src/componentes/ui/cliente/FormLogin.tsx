import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";

export default function FormLogin() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = () => {
    //PREGUNTAR POR METODO DE ENVIO DE DATOS (OBJETO O FORM)
  };
  return (
    <Box component="form" autoComplete="off" onSubmit={()=>onSubmit()}
    sx={{padding:3}}>
      <Stack spacing={2}>
        <TextField
          required
          type="text"
          label="Nombre de Usuario"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          required
          type="password"
          label="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="info">
          Ingresar
        </Button>
      </Stack>
    </Box>
  );
}
