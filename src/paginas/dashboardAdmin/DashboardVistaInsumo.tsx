import { Typography } from "@mui/material";
import BuscarInsumo from "../../componentes/ui/dashboard/vistaInsumos/BuscarInsumo";
import DashboardSidebar from "../../layouts/dashboard/DashboardSidebar";

function DashboardVistaInsumo() {
  return (
    <DashboardSidebar>
      <Typography variant="h4" sx={{marginTop:2}}>Lista de Insumos</Typography>
      <BuscarInsumo />
    </DashboardSidebar>
  );
}
export default DashboardVistaInsumo;
