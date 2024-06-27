import { Card, CardMedia, CardContent, Typography, Stack } from "@mui/material";
import Sucursal from "../../../../entidades/Sucursal";
import { Link } from "react-router-dom";

interface SucursalCardTypes {
  sucursal: Sucursal;
}

export default function SucursalCard({ sucursal }: SucursalCardTypes) {
  return (
    <Card
      sx={{ maxWidth: 300, background: "inherit", border: "1px solid grey" }}
    >
      <CardMedia
        sx={{ height: 150, objectFit: "scale-down" }}
        image="/imgs/sucursal.jpg"
      />
      <CardContent sx={{ textAlign: "center" }}>
        <Link to={`/cliente/sucursal/${sucursal.id}`} style={{color:"black"}}>
          <Typography variant="h5" component="div" sx={{fontWeight:"bolder"}}>
            {sucursal.nombre}
          </Typography>
        </Link>

        <Stack>
          <Typography variant="body2" color="text.primary">
            Ubicado en: {sucursal.domicilio.calle} y {sucursal.domicilio.numero}
          </Typography>
          <Typography variant="body2" color="text.primary">
            Horarios: Lunes a Domingos de 20:00 a 12:00, Sábados y Domingos de 11:00 a 15:00
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
