import { Box, Modal, Paper, Stack } from "@mui/material";
import CardArticulo from "./CardArticulo";
import DetallePedido from "../../../../entidades/DetallePedido";

interface ModalListadoProductosTypes {
  open: boolean;
  setOpen: (item: boolean) => void;
  detalles: DetallePedido[];
}

export default function ModalListadoProductos({ open, setOpen, detalles }: ModalListadoProductosTypes) {
  return (
    <Modal open={open} onClose={() => setOpen(!open)}>
      <Paper
        elevation={5}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          minWidth: 360,
          maxWidth: "90vw", // Para que la modal no sea demasiado ancha en pantallas pequeñas
          maxHeight: "90vh", // Limitar la altura máxima al 90% de la altura de la ventana
          overflow: "auto", // Hacer que el contenido dentro del Box sea desplazable
        }}
      >
        <Box component="div">
          <Stack spacing={2}>
            {detalles.map((item: DetallePedido) => (
              <CardArticulo detalle={item} />
            ))}
          </Stack>
        </Box>
      </Paper>
    </Modal>
  );
}
