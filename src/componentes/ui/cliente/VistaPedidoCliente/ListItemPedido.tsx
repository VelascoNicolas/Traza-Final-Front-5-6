import {  Box,  ListItem, Stack, Typography } from "@mui/material";
import DetallePedido from "../../../../entidades/DetallePedido";

interface ListItemPedidoTypes{
  objeto:DetallePedido;
}

export default function ListItemPedido({objeto}:ListItemPedidoTypes) {
  let datos;
  if(objeto.articuloAux!=null){
    datos=objeto.articuloAux;
  }else{
    datos=objeto.promocionAux;
  }
  let precioUni=objeto.subTotal/objeto.cantidad
  return (
    <ListItem>
      <Stack
        direction={{ xs: "column", sm: "column", md: "row" }}
        spacing={2}
        alignItems="center"
      >
        <Box
          component="img"
          src={datos?.imagenes[0].url}
          sx={{ width: 200 }}
        />
        <Stack direction="column" spacing={1} alignItems={"center"} justifyContent={"space-between"}>
          <Typography>{datos?.denominacion}</Typography>
          <Typography variant="body2" color="text.secondary">
            Precio Unitario $: {precioUni}
          </Typography>
        </Stack>
        <Stack direction="column" spacing={1} alignItems={"center"}>
          <Typography>Cantidad: {objeto.cantidad} unidad/es</Typography>
          <Typography variant="body2" color="text.secondary">
            SubTotal $ {objeto.subTotal}
          </Typography>
        </Stack>
      </Stack>
    </ListItem>
  );
}
