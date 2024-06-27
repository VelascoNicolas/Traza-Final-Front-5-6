import { Grid, Typography } from "@mui/material";
import BuscarEmpresa from "../../componentes/ui/dashboard/vistaEmpresas/BuscarEmpresa";
import DashboardSidebar from "../../layouts/dashboard/DashboardSidebar";

function DashboardVistaEmpresa() {
  return (
    <DashboardSidebar>
      <Grid container>
        <Grid item>
          <Typography variant="h4" sx={{ marginTop: 2, textAlign:"center" }}>
            Lista de Empresas
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <BuscarEmpresa />
        </Grid>
      </Grid>
    </DashboardSidebar>
  );
}
export default DashboardVistaEmpresa;
