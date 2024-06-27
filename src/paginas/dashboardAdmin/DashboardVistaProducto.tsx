import { Grid, Typography } from "@mui/material";
import BuscarProducto from "../../componentes/ui/dashboard/vistaProducto/BuscarProducto";
import DashboardSidebar from "../../layouts/dashboard/DashboardSidebar";

function DashboardVistaProducto() {
  return (
    <DashboardSidebar>
      <Grid container>
        <Grid item>
          <Typography variant="h4" sx={{ marginTop: 2, textAlign: "center" }}>
            Lista de Productos
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <BuscarProducto />
        </Grid>
      </Grid>
    </DashboardSidebar>
  );
}
export default DashboardVistaProducto;
