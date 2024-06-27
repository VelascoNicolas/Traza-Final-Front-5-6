import { Grid } from "@mui/material";
import Promocion from "../../../../entidades/Promocion";
import ItemGrillaPromo from "./ItemGrillaPromo";

interface GrillaProductosProps {
  promociones: Promocion[];
}

export default function GrillaProductos({ promociones }: GrillaProductosProps) {

  if (promociones.length === 0) {
    return null;
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{ backgroundColor: "#f1f5df", padding: 4, height: 700, overflow: "hidden", overflowY: "scroll" }}
    >
      {promociones.map((item: Promocion) => (
        <Grid item xs={12} sm={12} md={3}>
          <ItemGrillaPromo
            key={item.id}
            item={item}
          />
        </Grid>
      ))}
    </Grid>
  );
}
