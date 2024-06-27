import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import Promocion from "../../../../entidades/Promocion";

interface ItemGrillaPromocion {
  item: Promocion;
  children: ReactNode;
}

export default function ItemGrillaPromocion({ item, children }: ItemGrillaPromocion) {

  return (
    <Grid item sx={{ marginBottom: 2 }}>
      <Card sx={{ width: 290 }}>
        <CardMedia
          sx={{ height: 190, margin: 1 }}
          image={item.imagenes[0].url}
        />
        <CardContent>
          <Typography color="text.secondary">
            {"De " + item.fechaDesde + " a " + item.fechaHasta}
          </Typography>
          <Typography variant="h6" component="div">
            {item.denominacion}
          </Typography>
          <Stack direction="column" spacing={1} sx={{ marginBottom: 3 }}>
            <Typography color="text.secondary">{item.denominacion}</Typography>
          </Stack>
          <Stack direction="column">
            <Typography variant="body1">Precio Especial: ${item.precioPromocional}</Typography>
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>{children}</CardActions>
      </Card>
    </Grid>
  );
}
