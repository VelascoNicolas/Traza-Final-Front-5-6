import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardVistaProducto from "./paginas/dashboardAdmin/DashboardVistaProducto";
import DashboardVistaEmpleado from "./paginas/dashboardAdmin/DashboardVistaEmpleado";
import DashboardVistaInsumo from "./paginas/dashboardAdmin/DashboardVistaInsumo";
import DashboardVistaCategoria from "./paginas/dashboardAdmin/DashboardVistaCategoria";
import DashboardVistaEmpresa from "./paginas/dashboardAdmin/DashboardVistaEmpresa";
import DashboardVistaPromocion from "./paginas/dashboardAdmin/DashboardVistaPromocion";
import DashboardVistaPedidos from "./paginas/dashboardAdmin/DashboardVistaPedidos";
import DashboardVistaInformes from "./paginas/dashboardAdmin/DashboardVistaInformes";
import DashboardVistaUMedida from "./paginas/dashboardAdmin/DashboardVistaUMedida";
import VistaProductosCliente from "./paginas/cliente/VistaProductosCliente";
import VistaPedidosCliente from "./paginas/cliente/VistaPedidosCliente";
import VistaCuentaCliente from "./paginas/cliente/VistaCuentaCliente";
import VistaLogin from "./paginas/cliente/VistaLogin";
import VistaDomicilioCliente from "./paginas/cliente/VistaDomicilioCliente";
import VistaBienvenida from "./paginas/cliente/VistaBienvenida";
import MercadoPagoSuccess from "./paginas/cliente/MercadoPagoSuccess";
import MercadoPagoError from "./paginas/cliente/MercadoPagoError";
import MercadoPagoPending from "./paginas/cliente/MercadoPagoPending";
import { Perfil } from "./componentes/ui/perfil/Perfil";
import VistaRegister from "./paginas/cliente/VistaRegister";

import { ThemeProvider, createTheme } from "@mui/material";
import "@fontsource/montserrat"
import "@fontsource/lekton"
import "@fontsource/roboto"
import VistaPedidoCliente from "./paginas/cliente/VistaPedidoCliente";
import { localData } from "./servicios/FuncionesAPI";
import { useEffect, useState } from "react";
import { CarritoProvider } from "./context/CarritoContext";
//PALETA DE COLORES DEL PROYECTO
const basilTheme = createTheme({
  palette: {
    primary: {
      main: "#356859",
      light: "#B9E4C9",
      dark: "#37966F",
      contrastText: "#ffffff",

    },
    secondary: {
      main: "#FD5523",
      light: "#FFFBE6",
      dark: "#E7D59C",
      contrastText: "#000000",
    },
  },
  typography: {
    fontFamily: [
      "montserrat",
      "lekton",
      "roboto"
    ].join(","),
  }
});

function App() {

  const [userRoles, setUserRoles] = useState<string[]>([]);

  useEffect(() => {
    const userRoles = localData.getRol("userRoles");
    setUserRoles(userRoles);
  });
 
  return (
       
 <BrowserRouter>
      <ThemeProvider theme={basilTheme}>
        <CarritoProvider>
        <Routes>
          <Route index element={<VistaBienvenida />} />
          {/*VISTA DE DASHBOARD*/}
          <Route path="/dashboard" element={ userRoles.includes("ADMIN") ? <DashboardVistaEmpresa /> : <VistaBienvenida />} />
          <Route path="/dashboard/categorias" element={userRoles.includes("ADMIN") ? <DashboardVistaCategoria /> : <VistaBienvenida />} />
          <Route path="/dashboard/informes" element={userRoles.includes("ADMIN") ?  <DashboardVistaInformes /> : <VistaBienvenida />} />
          <Route path="/dashboard/productos" element={userRoles.includes("ADMIN") ? <DashboardVistaProducto /> : <VistaBienvenida />} />
          <Route path="/dashboard/empleados" element={userRoles.includes("ADMIN") ? <DashboardVistaEmpleado /> : <VistaBienvenida />} />
          <Route path="/dashboard/promociones" element={userRoles.includes("ADMIN") ? <DashboardVistaPromocion />: <VistaBienvenida />} />
          <Route path="/dashboard/insumos" element={userRoles.includes("ADMIN") ? <DashboardVistaInsumo /> : <VistaBienvenida />} />
          <Route path="/dashboard/uDeMedida" element={userRoles.includes("ADMIN") ? <DashboardVistaUMedida />: <VistaBienvenida />} />
          <Route path="/dashboard/pedidos" element={(userRoles.some(role => ["ADMIN", "COCINERO", "CAJERO", "DELIVERY"].includes(role))) ?   <DashboardVistaPedidos /> : <VistaBienvenida />} />
          {/*VISTA DE CLIENTE*/}
          <Route path="/register" element={(userRoles.some(role => ["ADMIN", "COCINERO", "CAJERO", "DELIVERY"].includes(role))) ?  <DashboardVistaPedidos /> : <VistaRegister /> } />
          <Route path="/login" element={(userRoles.some(role => ["ADMIN", "COCINERO", "CAJERO", "DELIVERY"].includes(role))) ?  <DashboardVistaPedidos /> : <VistaLogin />} />
          <Route path="/perfil" element={(userRoles.some(role => ["ADMIN", "COCINERO", "CAJERO", "DELIVERY"].includes(role))) ?  <DashboardVistaPedidos /> : <Perfil />} />
          <Route path="/cliente/bienvenida" element={(userRoles.some(role => ["ADMIN", "COCINERO", "CAJERO", "DELIVERY"].includes(role))) ?  <DashboardVistaPedidos /> :<VistaBienvenida />} />
          <Route path='/cliente/sucursal/:id' element={(userRoles.some(role => ["ADMIN", "COCINERO", "CAJERO", "DELIVERY"].includes(role))) ?  <DashboardVistaPedidos /> :<VistaProductosCliente />} />
          <Route path="/cliente/pedidos" element={(userRoles.some(role => ["ADMIN", "COCINERO", "CAJERO", "DELIVERY"].includes(role))) ?  <DashboardVistaPedidos /> :<VistaPedidosCliente />} />
          <Route path="/cliente/cuenta" element={(userRoles.some(role => ["ADMIN", "COCINERO", "CAJERO", "DELIVERY"].includes(role))) ?  <DashboardVistaPedidos /> :<VistaCuentaCliente />} />
          <Route path="/cliente/domicilios" element={(userRoles.some(role => ["ADMIN", "COCINERO", "CAJERO", "DELIVERY"].includes(role))) ?  <DashboardVistaPedidos /> :<VistaDomicilioCliente />} />
          <Route path="/cliente/miPedido" element={(userRoles.some(role => ["ADMIN", "COCINERO", "CAJERO", "DELIVERY"].includes(role))) ?  <DashboardVistaPedidos /> :<VistaPedidoCliente />} />
          <Route path="/cliente/mpExito" element={(userRoles.some(role => ["ADMIN", "COCINERO", "CAJERO", "DELIVERY"].includes(role))) ?  <DashboardVistaPedidos /> :<MercadoPagoSuccess />} />
          <Route path="/cliente/mpError" element={(userRoles.some(role => ["ADMIN", "COCINERO", "CAJERO", "DELIVERY"].includes(role))) ?  <DashboardVistaPedidos /> :<MercadoPagoError />} />
          <Route path="/cliente/mpPending" element={(userRoles.some(role => ["ADMIN", "COCINERO", "CAJERO", "DELIVERY"].includes(role))) ?  <DashboardVistaPedidos /> :<MercadoPagoPending />} />
        </Routes>
        </CarritoProvider>
        
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
