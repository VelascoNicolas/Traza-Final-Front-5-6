import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";

interface FormSelectPagoTypes {
  metodoEntrega: string;
  metodoPago: string;
  setMetodoEntrega: (item: string) => void;
  setMetodoPago: (item: string) => void;
}

export default function FormSelectPago({
  metodoEntrega,
  metodoPago,
  setMetodoEntrega,
  setMetodoPago,
}: FormSelectPagoTypes) {
  return (
    <Box component="form" autoComplete="off">
      <Stack
        direction={{ xs: "column", sm: "column", md: "row" }}
        spacing={2}
        alignItems="center"
      >
        <FormControl>
          <FormLabel id="radio-button-metodo-entrega">
            Metodo de Entrega
          </FormLabel>
          <RadioGroup
            aria-labelledby="radio-button-metodo-entrega"
            name="radio-button-metodo-entrega"
            value={metodoEntrega}
            onChange={(e) => {setMetodoEntrega(e.target.value);}}
          >
            <FormControlLabel
              value="DELIVERY"
              control={<Radio />}
              label="Por Delivery"
              disabled={metodoPago=="EFECTIVO"}
            />
            <FormControlLabel
              value="TAKE_AWAY"
              control={<Radio />}
              label="Retiro en local"
            />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel id="radio-button-metodo-pago">Metodo de Pago</FormLabel>
          <RadioGroup
            aria-labelledby="radio-button-metodo-pago"
            name="radio-button-metodo-pago"
            value={metodoPago}
            onChange={(e) =>{setMetodoPago(e.target.value)}}
          >
            <FormControlLabel
              value="EFECTIVO"
              control={<Radio />}
              label="Efectivo"
              disabled={metodoEntrega == "DELIVERY"}
            />
            <FormControlLabel
              value="MERCADO_PAGO"
              control={<Radio />}
              label="Mercado Pago"
            />
          </RadioGroup>
        </FormControl>
      </Stack>
    </Box>
  );
}
