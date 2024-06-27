import { ArrowDropDown } from "@mui/icons-material";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import Pedido from "../../../../entidades/Pedido";
import ModalListadoProductos from "./ModalListadoProductos";
import { useState } from "react";

interface AcordeonPedidoTypes {
  pedido: Pedido;
}

export default function AcordeonPedido({ pedido }: AcordeonPedidoTypes) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <Accordion sx={{ backgroundColor: "#B9E4C9" }}>
      <AccordionSummary expandIcon={<ArrowDropDown />}>
        <Stack direction="row" spacing={1} alignItems={"center"}>
          <Typography>Pedido N°{pedido.id}</Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack
          direction={{ xs: "column", sm: "column", md: "row" }}
          spacing={{ xs: 2, sm: 2, md: 5 }}
        >
          <fieldset>
            <legend>Datos de Facturacion:</legend>
            <Stack>
              <Typography>Metodo de Entrega: {pedido.tipoEnvio}</Typography>
              <Typography>Metodo de Pago: {pedido.formaPago}</Typography>
              <Typography>Domicilio: {pedido.domicilio.calle + " " + pedido.domicilio.numero}</Typography>
            </Stack>
          </fieldset>
          <fieldset>
            <legend>Datos Cliente</legend>
            <Stack>
              <Typography>Nombre: {pedido.cliente.nombre}</Typography>
              <Typography>Apellido: {pedido.cliente.apellido}</Typography>
              <Typography>Telefono: {pedido.cliente.telefono}</Typography>
            </Stack>
          </fieldset>
          <fieldset>
            <legend>Datos Sucursal</legend>
            <Typography>Nombre Sucursal: {pedido.sucursal.nombre}</Typography>
            <Typography>Direccion: {pedido.sucursal.domicilio.calle + " " + pedido.sucursal.domicilio.numero}</Typography>
            <Typography>Localidad: {pedido.sucursal.domicilio.localidad.nombre}</Typography>
            <Typography>Provincia: {pedido.sucursal.domicilio.localidad.provincia.nombre}</Typography>
          </fieldset>
          <fieldset>
            <legend>Datos Pedido</legend>
            <Typography>Fecha pedido: {pedido.fechaPedido}</Typography>
            <Typography>Monto Total ${pedido.total}</Typography>
            <Typography>Estado Pedido: {pedido.estado}</Typography>
          </fieldset>
        </Stack>
      </AccordionDetails>
      <AccordionActions>
        <Button variant="contained" color="info">
          <Typography sx={{ fontSize: 13 }} onClick={() => setOpenModal(!openModal)}>Productos Pedidos</Typography>
        </Button>
        <a href={`https://traza-final.onrender.com/facturas/${pedido.id}`} target="_blank" rel="noopener noreferrer">
          <Button variant="contained" color="warning">
            <Typography sx={{ fontSize: 13 }}>Descargar Factura</Typography>
          </Button>
        </a>
      </AccordionActions>
      <ModalListadoProductos open={openModal} setOpen={setOpenModal} detalles={pedido.detallePedidos} />
    </Accordion>
  );
}
