import { Add, Info, Remove, ShoppingCart } from "@mui/icons-material";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Stack,
  Badge,
  Popover,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useContext, useState } from "react";
import { CarritoContext } from "../../../../context/CarritoContext";
import Promocion from "../../../../entidades/Promocion";
import { useAuth0 } from "@auth0/auth0-react";
import moment from "moment";

interface ItemGrillaProductoTypes {
  item: Promocion;
}

export default function ItemGrilla({ item }: ItemGrillaProductoTypes) {
  const { carrito, addPromoCarrito, removePromoCarrito } = useContext(CarritoContext);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { isAuthenticated } = useAuth0();

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const now = moment().tz('America/Argentina/Buenos_Aires');

  const isWithinTimeRange = () => {
    const dayOfWeek = now.day(); // 0 = domingo, 1 = lunes, ..., 6 = sábado
    const hour = now.hour();
    const minute = now.minute();

    // Horarios de lunes a viernes (20:00 - 00:00)
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      if ((hour === 17 && minute >= 0) || (hour >= 18 && hour < 24)) {
        return true;
      }
    }

    // Horarios de sábados y domingos (11:00 - 15:00 y 20:00 - 00:00)
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      if ((hour === 11 && minute >= 0) || (hour >= 12 && hour < 15) || 
          (hour === 20 && minute >= 0) || (hour >= 0 && hour < 24)) {
        return true;
      }
    }

    return false;
  };

  const estaEnCarrito = carrito.find((itemCarrito) => itemCarrito.promocion === item.id);

  return (
    <Card sx={{ maxWidth: 330, textAlign: "center" }}>
      <CardMedia
        sx={{ height: 150, margin: 1 }}
        image={item.imagenes[0].url}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.denominacion}
        </Typography>
        <Typography variant="h6" color="text">
          {"$" + item.precioPromocional}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Stack spacing={2} alignItems={"center"}>
          <Button
            size="small"
            //disabled={(usuario == null)}
            variant="contained"
            color="info"
            startIcon={<Info />}
            onClick={handleOpenPopover}
          >
            ¿Qué trae?
          </Button>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <List>
              {item.promocionDetalles.map((detalle, index) => (
                <ListItem key={index}>
                  <ListItemText primary={detalle.cantidad + " " + detalle.articulo.denominacion} />
                </ListItem>
              ))}
            </List>
          </Popover>
          {(isAuthenticated && isWithinTimeRange()) && (
          <Stack direction={"row"}>
            <Button
              size="small"
              startIcon={<Remove />}
              onClick={() => { removePromoCarrito(item) }}
            />
            <Badge badgeContent={estaEnCarrito ? estaEnCarrito.cantidad : 0} color="info">
              <ShoppingCart />
            </Badge>
            <Button size="small"
              startIcon={<Add />}
              onClick={() => { addPromoCarrito(item) }}
            />
          </Stack>
          )}
        </Stack>
      </CardActions>
    </Card>
  );
}
