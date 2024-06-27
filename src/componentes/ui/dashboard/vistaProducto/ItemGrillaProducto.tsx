import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions
} from "@mui/material";
import { ReactNode } from "react";

interface ItemGrillaProductoTypes{
    nombre:string;
    urlImagen:string;
    precio:string;
    tiempoCoccion:string;
    children:ReactNode;
}

export default function ItemGrillaProducto({nombre,urlImagen,precio,tiempoCoccion,children}:ItemGrillaProductoTypes) {
  return (
    <Grid item sx={{marginBottom:2}}>
      <Card sx={{ width: 230, textAlign: "center" }}>
        <CardMedia
          sx={{ height: 150, margin: 1}}
          image={urlImagen}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {nombre}
          </Typography>
          <Typography variant="h6" color="text">
            {precio}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {tiempoCoccion}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>{children}</CardActions>
      </Card>
    </Grid>
  );
}
