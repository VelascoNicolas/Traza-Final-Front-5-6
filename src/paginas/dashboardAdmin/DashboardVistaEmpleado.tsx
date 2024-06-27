import { Grid, Typography } from "@mui/material";
import BuscadorEmpleado from "../../componentes/ui/dashboard/vistaEmpleados/BuscarEmpleado";
import DashboardSidebar from "../../layouts/dashboard/DashboardSidebar";

function DashboardVistaEmpleado() {
  return (
    <DashboardSidebar>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          sx={{ marginTop: 2, textAlign: "center" }}
        >
          <Typography variant="h5">Lista de Empleados</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <BuscadorEmpleado />
        </Grid>
      </Grid>
    </DashboardSidebar>
  );
}

export default DashboardVistaEmpleado;
