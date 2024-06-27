import { Grid, Typography } from "@mui/material";
import BuscarCategoria from "../../componentes/ui/dashboard/vistaCategorias/BuscarCategoria";
import DashboardSidebar from "../../layouts/dashboard/DashboardSidebar";

function DashboardVistaCategoria() {
  return (
    <DashboardSidebar>
      <Grid container>
        <Grid item>
          <Typography variant="h4" sx={{ marginTop: 2, textAlign: "center" }}>
            Lista de Categorias
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <BuscarCategoria />
        </Grid>
      </Grid>
    </DashboardSidebar>
  );
}
export default DashboardVistaCategoria;
