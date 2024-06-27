import React, { useState } from "react";
import { Box, FormControl, Input, Stack } from "@mui/material";
import BtnAgregarEmpleado from "./BotonAgregarEmpleado";
import ListContainerEmpleado from "./ListContainerEmpleado";

function BuscadorEmpleado() {
  const [nombre, setNombre] = useState("");

  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Box>
      <Stack direction={{ xs: "column", sm: "column", md: "row" }}
        spacing={{
          xs: 1,
          sm: 1,
          md: 2,
        }}
        alignItems="center">
        <Box component="form" onSubmit={handleBuscar}>
          <FormControl fullWidth margin="normal">
            <Input
              placeholder="Buscar empleado"
              id="nombreEmpleado"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              sx={{ width: "300px" }}
            />
          </FormControl>
        </Box>
        <BtnAgregarEmpleado />
      </Stack>
      <ListContainerEmpleado busqueda={nombre} />
    </Box>
  );
}

export default BuscadorEmpleado;
