import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Grid,
} from "@mui/material";
import { ReactNode } from "react";

interface ItemGrillaTypes {
  nombre: string; //Nombre de empresa o sucursal
  descripcion: string; //Datos de interes a mostrar de la empresa o sucursal
  info: string; //Info adicional de la empresa o sucursal
  info2: string; //Info adicional de la empresa o sucursal
  children: ReactNode;
  urlImagen: string;
}

export default function ItemGrilla({
  nombre,
  descripcion,
  children,
  info,
  info2,
  urlImagen
}: ItemGrillaTypes) {
  return (
    <Grid item sx={{ marginBottom: 2 }}>
      <Card sx={{ width: 320, textAlign: "center" }}>
        <CardMedia
          sx={{ height: 260, margin: 1 }}
          image={urlImagen}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {nombre}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {descripcion}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {info}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {info2}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>{children}</CardActions>
      </Card>
    </Grid>
  );
}
