import { Paper, Stack } from "@mui/material";
import AcordeonPedido from "./AcordeonPedido";
import { getAllPedidos } from "../../../../servicios/FuncionesAPI";
import Pedido from "../../../../entidades/Pedido";

export default function PedidosContainer() {
  const { data: pedidos } = getAllPedidos();

  return (
    <Paper
      elevation={5}
      sx={{
        maxHeight: 600,
        overflow: "hidden",
        overflowY: "scroll",
        padding: 3
      }}
    >
      <Stack spacing={2}>
        {pedidos?.sort((a, b) => b.id - a.id)
          .map((item: Pedido) => (
            <>
              <AcordeonPedido pedido={item} />
            </>
          ))}
      </Stack>
    </Paper>
  );
}
