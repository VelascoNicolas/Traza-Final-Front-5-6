import { CheckCircle } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

export default function MercadoPagoSuccess() {
  return (
    
      <Box
        component="div"
        sx={{
          width: "100wh",
          height: "100vh",
          background:
            "linear-gradient(-45deg, rgba(255,255,255,1) 0%, rgba(42,213,85,1) 100%);",
        }}
      >
        <Container sx={{padding:2}}>
          <Paper
            elevation={5}
            sx={{
              background: "rgba(255,255,255,0.48)",
              backdropFilter: "blur(5px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              padding:3
              
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "column" }}
              spacing={2}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Box component="div">
                <CheckCircle sx={{ fontSize: "130pt" }} color="success" />
              </Box>
              <Divider />
              <Box component="div">
                <Typography variant="h4" align="center">
                  Tu pago ha sido procesado con exito
                </Typography>
                <Typography variant="h5" align="center">
                  Disfruta de tu compra!
                </Typography>
              </Box>
              <Button variant="contained" color="info">
                Regresar a la tienda
              </Button>
            </Stack>
          </Paper>
        </Container>
      </Box>
    
  );
}
