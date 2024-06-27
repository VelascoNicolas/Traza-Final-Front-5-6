import { Card, CardContent,Typography } from "@mui/material";

interface ItemAlertaTypes {
  nombre: string;
  cantidad: number;
  unidadMedida: string;
  estiloColor: string;
  nivelAlerta:string
}

function ItemAlerta({nombre,cantidad,unidadMedida,estiloColor,nivelAlerta}:ItemAlertaTypes) {
  return (
    <Card sx={{ maxWidth: 345, textAlign: "center" ,backgroundColor:estiloColor}}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {nombre}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Cantidad: {cantidad} {unidadMedida}
        </Typography>
        <Typography variant="body1">
          {nivelAlerta}
        </Typography>
      </CardContent>
    </Card>
  );
}
export default ItemAlerta;
