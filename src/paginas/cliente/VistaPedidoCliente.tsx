import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ClienteLayout from "../../layouts/cliente/ClienteLayout";
import ListContainerPedido from "../../componentes/ui/cliente/VistaPedidoCliente/ListContainerPedido";
import FormSelectPago from "../../componentes/ui/cliente/VistaPedidoCliente/FormSelectPago";
import FormSelectDomicilio from "../../componentes/ui/cliente/VistaPedidoCliente/FormSelectDomicilio";
import { useContext, useState } from "react";
import { AttachMoney } from "@mui/icons-material";
import { CarritoContext } from "../../context/CarritoContext";
import {
  localData,
  savePedido,
} from "../../servicios/FuncionesAPI";
import Pedido from "../../entidades/Pedido";
import Cliente from "../../entidades/Cliente";
import Sucursal from "../../entidades/Sucursal";
import Domicilio from "../../entidades/Domicilio";

export default function VistaPedidoCliente() {
  const [open, setOpen] = useState(false);
  const [metodoEntrega, setMetodoEntrega] = useState<string>("TAKE_AWAY");
  const [metodoPago, setMetodoPago] = useState<string>("MERCADO_PAGO");
  const [domicilio, setDomicilio] = useState<number>(0);
  const { carrito, totalPedido, totalEnvio, setTotalPedido, vaciarCarrito } =
    useContext(CarritoContext);
  const [pedido, setPedido] = useState<Pedido>(new Pedido());
  const cliente: Cliente = localData.getCliente("Cliente");
  const sucursal: Sucursal = localData.getSucursal("sucursal");

  const postPedido = () => {
    var fecha = new Date().toJSON().slice(0, 10); //Dia actual

    const pedidoTemplate = {
      ...pedido,
      horaEstimadaFinalizacion: "22:00:00.000",
      totalCosto: 0,
      estado: "PENDIENTE",
      sucursal: sucursal,
      cliente: cliente,
      fechaPedido: fecha,
      factura: null,
      detallePedidos: carrito,
    };
    setPedido(pedidoTemplate);

    //POST SIN DOMICILIO
    if (metodoEntrega == "TAKE_AWAY") {
      if (metodoPago == "EFECTIVO") {
        alert("LLAMADA A POST CON EFECTIVO Y TAKE AWAY");
        setPedido({
          ...pedidoTemplate,
          total: totalPedido,
          tipoEnvio: metodoEntrega,
          formaPago: metodoPago,
          domicilio: sucursal.domicilio,
        })
        savePedido(pedidoTemplate, setTotalPedido, vaciarCarrito, 0);
      } else {
        //HACER POST Y LLAMAR MERCADOPAGO
        setPedido({
          ...pedidoTemplate,
          total: totalPedido,
          tipoEnvio: metodoEntrega,
          formaPago: metodoPago,
          domicilio: sucursal.domicilio,
        })
        savePedido(pedidoTemplate,setTotalPedido,vaciarCarrito,0);
        //llamarMercadoPago(pedidoID)
      }
    } else {
      //POST CON DOMICILIO
      const domi=cliente.domicilios.find((item:Domicilio)=>item.id==domicilio);
      setPedido({
        ...pedidoTemplate,
        total: totalPedido,
        tipoEnvio: metodoEntrega,
        formaPago: metodoPago,
        domicilio: domi!,
      })
      //HACER POST
      savePedido(pedidoTemplate,setTotalPedido,vaciarCarrito,20);
      //llamarMercadoPago(pedidoID)
    }
  };

  const generarBoton = () => {
    if (metodoPago == "EFECTIVO") {
      return (
        <Button
          variant="contained"
          color="info"
          sx={{ marginBottom: 2 }}
          onClick={() => {
            postPedido();
          }}
        >
          Generar Pedido
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          color="warning"
          sx={{ marginBottom: 2 }}
          onClick={() => {
            postPedido();
          }}
        >
          Ir a pagar
        </Button>
      );
    }
  };
  return (
    <ClienteLayout estado={open} setEstado={setOpen}>
      <Container>
        <Box
          component="div"
          sx={{
            backgroundColor: "#282828",
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            marginBottom: 2,
            padding: 2,
          }}
        >
          <Typography variant="h5" color="white" textAlign="center">
            Revisa tu pedido
          </Typography>
        </Box>
        <Paper
          elevation={5}
          sx={{
            marginTop: 2,
          }}
        >
          <Stack alignItems="center">
            <ListContainerPedido />
            <Button variant="contained" color="success">
              Total Pedido <AttachMoney />
              <Typography>
                {metodoEntrega == "TAKE_AWAY"
                  ? totalPedido * (1 - 0.1)
                  : totalPedido + totalEnvio}
              </Typography>
            </Button>
            <FormSelectPago
              metodoEntrega={metodoEntrega}
              metodoPago={metodoPago}
              setMetodoEntrega={setMetodoEntrega}
              setMetodoPago={setMetodoPago}
            />
            <Typography sx={{ padding: 3 }} textAlign="center">
              Obtene un 10% Off retirando en sucursal
            </Typography>
          </Stack>
          <FormSelectDomicilio
            metodoEntrega={metodoEntrega}
            domicilio={domicilio}
            setDomicilio={setDomicilio}
            domicilios={cliente.domicilios}
          />
          <Stack direction="row" justifyContent="center">
            {generarBoton()}
          </Stack>
        </Paper>
      </Container>
    </ClienteLayout>
  );
}
