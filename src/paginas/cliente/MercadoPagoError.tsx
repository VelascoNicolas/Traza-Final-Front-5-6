import { Cancel } from "@mui/icons-material";
import {
  Box,
  Container,
  Paper,
  Stack,
  Divider,
  Typography,
  Button,
} from "@mui/material";
import ClienteLayout from "../../layouts/cliente/ClienteLayout";

export default function MercadoPagoError() {
  return (
    <ClienteLayout>
      <Box
        component="div"
        sx={{
          width: "100wh",
          height: "100vh",
          background:
            "linear-gradient(-45deg, rgba(242,242,239,1) 0%, rgba(245,38,38,1) 100%)"
        }}
      >
        <Container sx={{ padding: 2 }}>
          <Paper
            elevation={5}
            sx={{
              background: "rgba(255,255,255,0.48)",
              backdropFilter: "blur(5px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              padding: 3,
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "column" }}
              spacing={2}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Box component="div">
                <Cancel sx={{ fontSize: "130pt" }} color="error" />
              </Box>
              <Divider />
              <Box component="div">
                <Typography variant="h4" align="center">
                  Ocurrio un error al procesar tu pago
                </Typography>
                <Typography variant="h5" align="center">
                  Tu pedido estara disponible para que lo vuelvas a intentar
                </Typography>
              </Box>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" color="info">
                  Regresar a la tienda
                </Button>
                <Button variant="contained" color="warning">Ver mis Pedidos</Button>
              </Stack>
            </Stack>
          </Paper>
        </Container>
      </Box>
    </ClienteLayout>
  );
}
