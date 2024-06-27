import React, { useState } from "react";
import { Box, FormControl, Input, Stack } from "@mui/material";
import BotonAgregarProducto from "./BotonAgregarProducto";
import GrillaProducto from "./GrillaProducto";

function BuscarProducto() {
  const [nombre, setNombre] = useState("");
  const userRoles: string[] = JSON.parse(localStorage.getItem("userRoles") || "[]");

  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Box>
      <Stack
        direction={{ xs: "column", sm: "column", md: "row" }}
        spacing={{
          xs: 1,
          sm: 1,
          md: 2,
        }}
        alignItems="center"
      >
        <Box component="form" onSubmit={handleBuscar}>
          <FormControl fullWidth margin="normal">
            <Input
              placeholder="Buscar producto"
              id="nombreProducto"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              sx={{ width: "300px" }}
            />
          </FormControl>
        </Box>
        {userRoles.includes("ADMIN") && (<BotonAgregarProducto />)}
      </Stack>
      <GrillaProducto busqueda={nombre} />
    </Box>
  );
}

export default BuscarProducto;
