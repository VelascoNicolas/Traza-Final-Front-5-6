import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Avatar, Button, ListItemAvatar, Stack, Typography } from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Add, Remove, RemoveShoppingCart } from "@mui/icons-material";
import { useContext, useState } from "react";
import { CarritoContext } from "../../../../context/CarritoContext";
import { savePedido } from "../../../../servicios/FuncionesAPI";
import Pedido from "../../../../entidades/Pedido";
import ArticuloInsumo from "../../../../entidades/ArticuloInsumo";
import ArticuloManufacturado from "../../../../entidades/ArticuloManufacturado";
import DetallePedido from "../../../../entidades/DetallePedido";

interface DrawerTypes {
  estado: boolean;
  setEstado: (item: boolean) => void;
}

export default function SidebarCarrito({ estado, setEstado }: DrawerTypes) {
  const { carrito, vaciarCarrito, totalPedido, setTotalPedido, addArticuloCarrito, removeArticuloCarrito, addPromoCarrito, removePromoCarrito, totalEnvio } = useContext(CarritoContext);
  const [pedido, setPedido] = useState<Pedido>(new Pedido);

  const handleSubmit = () => {
    var fecha = new Date().toJSON().slice(0, 10);//Dia actual

    const updatedPedido = {
      ...pedido,
      horaEstimadaFinalizacion: "22:00:00.000",
      total: totalPedido,
      totalCosto: 0,
      estado: "PENDIENTE",
      tipoEnvio: "DELIVERY",
      formaPago: "EFECTIVO",
      fechaPedido: fecha,
      detallePedidos: carrito,
    };
    setPedido(updatedPedido);
    savePedido(updatedPedido, setTotalPedido, vaciarCarrito, totalEnvio);
  };

  const verificarStock = (item: DetallePedido) => {
    if ((item.articuloAux as ArticuloInsumo).esParaElaborar != null) {
      return (item.articuloAux as ArticuloInsumo).stockActual > item.cantidad;
    } else {
      return (item.articuloAux as ArticuloManufacturado).articuloManufacturadoDetalles.every(detalle => detalle.articuloInsumo.stockActual >= (item.cantidad + 1) * detalle.cantidad);
    }
  };

  const handleAddClick = (item: DetallePedido) => {
    if (verificarStock(item)) {
      addArticuloCarrito(item.articuloAux!);
    } else {
      alert("No hay stock suficiente");
    }
  };

  const DrawerList = (
    <Box sx={{ width: 350 }} role="presentation">
      <Typography variant="h4" textAlign={"center"} marginTop={2}>
        Mi Carrito
      </Typography>
      <Divider />
      {carrito.length == 0 && <span>El carrito esta vacío.</span>}
      <List>
        {carrito.map((item) => {
          if (item.articuloAux) {
            return (
              <ListItem key={item.id}>
                <ListItemAvatar>
                  <Avatar src={item.articuloAux.imagenes[0].url} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.articuloAux.denominacion}
                  secondary={
                    <>
                      <div>{item.cantidad} {item.cantidad === 1 ? 'unidad' : 'unidades'}</div>
                      <div>Precio por unidad: ${item.articuloAux.precioVenta.toFixed(2)}</div>
                      <div>Subtotal: ${(item.articuloAux.precioVenta * item.cantidad).toFixed(2)}</div>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          startIcon={<Remove />}
                          onClick={() => { removeArticuloCarrito(item.articuloAux!) }}
                          sx={{ minWidth: 30 }}
                        />
                        <Box sx={{
                          width: 40,
                          height: 40,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'white',
                          borderRadius: 1,
                          margin: '0 8px',
                          border: '1px solid #ccc'
                        }}>
                          <Typography variant="body1">{item.cantidad}</Typography>
                        </Box>
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          startIcon={<Add />}
                          onClick={() => { handleAddClick(item) }}
                          sx={{ minWidth: 30 }}
                        />
                      </Box>
                    </>
                  }
                />
              </ListItem>
            );
          } else if (item.promocionAux) {
            return (
              <ListItem key={item.id}>
                <ListItemAvatar>
                  <Avatar src={item.promocionAux.imagenes[0].url} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.promocionAux.denominacion}
                  secondary={
                    <>
                      <div>{item.cantidad} {item.cantidad === 1 ? 'promo' : 'promos'}</div>
                      <div>Precio promo: ${item.promocionAux.precioPromocional.toFixed(2)}</div>
                      <div>Subtotal: ${(item.promocionAux.precioPromocional * item.cantidad).toFixed(2)}</div>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          startIcon={<Remove />}
                          onClick={() => { removePromoCarrito(item.promocionAux!) }}
                          sx={{ minWidth: 30 }}
                        />
                        <Box sx={{
                          width: 40,
                          height: 40,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'white',
                          borderRadius: 1,
                          margin: '0 8px',
                          border: '1px solid #ccc'
                        }}>
                          <Typography variant="body1">{item.cantidad}</Typography>
                        </Box>
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          startIcon={<Add />}
                          onClick={() => { addPromoCarrito(item.promocionAux!) }}
                          sx={{ minWidth: 30 }}
                        />
                      </Box>
                    </>
                  }
                />
              </ListItem>
            );
          } else {
            return null; // No hacer nada si ambos son nulos (opcional)
          }
        })}
      </List>
      <Divider />
      <Typography variant="h5" textAlign={"center"} marginBottom={2}>
        Pedido: ${totalPedido}
      </Typography>
      <Typography variant="h5" textAlign={"center"} marginBottom={2}>
        Costo de envío: ${totalEnvio}
      </Typography>
      <Typography variant="h5" textAlign={"center"} marginBottom={2}>
        Total: ${totalPedido}
      </Typography>
      <Divider />
      <Stack direction="row" spacing={3} justifyContent={"center"}>
        {carrito.length == 0 ? (
          <Button
            variant="contained"
            startIcon={<ShoppingCartCheckoutIcon />}
            disabled
          >
            Pedir
          </Button>
        ) : (
          <Button
            variant="contained"
            startIcon={<ShoppingCartCheckoutIcon />}
            onClick={handleSubmit}
          >
            Pedir
          </Button>
        )}
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            vaciarCarrito();
          }}
          startIcon={<RemoveShoppingCart />}
        >
          Vaciar
        </Button>
      </Stack>
    </Box>
  );

  return (
    <div>
      <Drawer
        open={estado}
        onClose={() => {
          setEstado(!estado);
        }}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
