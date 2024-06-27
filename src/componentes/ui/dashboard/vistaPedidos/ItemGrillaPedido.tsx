import { Info } from "@mui/icons-material";
import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import Pedido from "../../../../entidades/Pedido";
import { useState } from "react";
import ModalPedidos from "./ModalPedidos";
import { editPedido } from "../../../../servicios/FuncionesAPI";


interface ItemGrillaPedidoTypes {
  pedidoObj: Pedido;
}

export default function ItemGrillaPedido({ pedidoObj }: ItemGrillaPedidoTypes) {
  const [open, setOpen] = useState(false);

  const userRoles: string[] = JSON.parse(localStorage.getItem("userRoles") || "[]");

  return (
    <Card>
      <CardContent>
        <Typography variant="body2" sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Fecha Pedido: {pedidoObj.fechaPedido}
        </Typography>
        <Typography variant="h5" component="div">
          Pedido N°: {pedidoObj.id}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Total Pedido: ${pedidoObj.total}
        </Typography>
        <Typography variant="body2">
          Hora Estimada Preparacion: {pedidoObj.horaEstimadaFinalizacion}
        </Typography>
        <Typography>
          Estado Pedido: {pedidoObj.estado}
        </Typography>
      </CardContent>
      <CardActions>
        <Stack direction="row" alignItems="center">
          <Button style={{ marginRight: '10px' }} size="medium" variant="contained" color="info" startIcon={<Info />} onClick={() => setOpen(!open)}>
            Mas Datos
          </Button>
          {pedidoObj.estado === "PENDIENTE" && (userRoles.includes("ADMIN") || userRoles.includes("CAJERO")) && (
            <ButtonGroup size="medium" variant="contained" color="primary">
              <Button style={{ marginRight: 2 }} onClick={() => editPedido(pedidoObj.id, "APROBADO")}>
                APROBAR
              </Button>
              <Button onClick={() => editPedido(pedidoObj.id, "RECHAZADO")}>
                RECHAZAR
              </Button>
            </ButtonGroup>
          )}

          {pedidoObj.estado === "TERMINADO" && (userRoles.includes("ADMIN") || userRoles.includes("CAJERO")) && (
            <ButtonGroup size="medium" variant="contained" color="primary">
              <Button style={{ marginRight: 2 }} onClick={() => editPedido(pedidoObj.id, "FACTURADO")}>
                FACTURADO
              </Button>
              <Button onClick={() => editPedido(pedidoObj.id, "DELIVERY")}>
                EN DELIVERY
              </Button>
            </ButtonGroup>
          )}

          {pedidoObj.estado === "DELIVERY" && (userRoles.includes("ADMIN") || userRoles.includes("CAJERO")) && (
            <ButtonGroup size="medium" variant="contained" color="primary">
           <Button size="medium" variant="contained" color="primary" onClick={() =>  editPedido(pedidoObj.id, "FACTURADO")}>
              Facturar
            </Button>
            <Button onClick={() => editPedido(pedidoObj.id, "RECHAZADO")}>
              RECHAZAR
            </Button>
          </ButtonGroup>
          )}
          {((userRoles.includes("ADMIN") || userRoles.includes("COCINERO")) && pedidoObj.estado === "APROBADO") && (
             <ButtonGroup size="medium" variant="contained" color="primary">
             <Button style={{ marginRight: 2 }} onClick={() => editPedido(pedidoObj.id, "TERMINADO")}>
               Listo
             </Button>
             <Button onClick={() => editPedido(pedidoObj.id, "RECHAZADO")}>
               RECHAZAR
             </Button>
           </ButtonGroup>
          )}

          {pedidoObj.estado === "FACTURADO" && (userRoles.includes("ADMIN") || userRoles.includes("CAJERO")) && (
              <a href={`https://traza-final.onrender.com/facturas/${pedidoObj.id}`} target="_blank" rel="noopener noreferrer">
              <Button variant="contained" color="warning">
                <Typography sx={{ fontSize: 13 }}>Descargar Factura</Typography>
               </Button>
                </a>
           )}

          <ModalPedidos open={open} setOpen={setOpen} pedido={pedidoObj} />
        </Stack>
      </CardActions>
    </Card>
  );
}
