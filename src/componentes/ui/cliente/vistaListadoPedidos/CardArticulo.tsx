import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import DetallePedido from "../../../../entidades/DetallePedido";

interface CardArticuloTypes {
  detalle: DetallePedido;
}

export default function CardArticulo({ detalle }: CardArticuloTypes) {
  if (detalle.articulo) {
    return (
      <Card key={detalle.id} sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          //@ts-ignore
          image={detalle.articulo.imagenes[0].url}
          //@ts-ignore
          title={detalle.articulo.denominacion}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center">
            {/*@ts-ignore*/}
            {detalle.articulo.denominacion}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            Cantidad: {detalle.cantidad} {detalle.cantidad === 1 ? 'unidad' : 'unidades'}
          </Typography>
          {/*@ts-ignore*/}
          <Typography variant="body2" color="text.secondary" align="center"> Precio por unidad: ${detalle.articulo.precioVenta.toFixed(2)}</Typography>
        </CardContent>
      </Card>
    );
  } else if (detalle.promocion) {
    return (
      <Card key={detalle.id} sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          //@ts-ignore
          image={detalle.promocion.imagenes[0].url}
          //@ts-ignore
          title={detalle.promocion.denominacion}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center">
            {/*@ts-ignore*/}
            {detalle.promocion.denominacion}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            Cantidad: {detalle.cantidad} {detalle.cantidad === 1 ? 'promo' : 'promos'}
          </Typography>
          {/*@ts-ignore*/}
          <Typography variant="body2" color="text.secondary" align="center"> Precio promo: ${detalle.promocion.precioPromocional.toFixed(2)}</Typography>
        </CardContent>
      </Card>
    );
  } else {
    return null; // No hacer nada si ambos son nulos (opcional)
  }
}