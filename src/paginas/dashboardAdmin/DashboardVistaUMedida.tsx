import { Grid, Typography } from "@mui/material";
import BuscarUMedida from "../../componentes/ui/dashboard/vistaUnidadMedida/BuscarUMedida";
import DashboardSidebar from "../../layouts/dashboard/DashboardSidebar";

function DashboardVistaUMedida() {
  return (
    <DashboardSidebar>
      <Grid container>
        <Grid item>
          <Typography variant="h4" sx={{ marginTop: 2, textAlign: "center" }}>
            Lista de Unidades de Medida
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <BuscarUMedida />
        </Grid>
      </Grid>
    </DashboardSidebar>
  );
}
export default DashboardVistaUMedida;
