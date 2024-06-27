import { Grid } from "@mui/material";
import ItemGrilla from "./ItemGrilla";
import ArticuloInsumo from "../../../../entidades/ArticuloInsumo";
import ArticuloManufacturado from "../../../../entidades/ArticuloManufacturado";

interface GrillaProductosProps {
  articulos: ArticuloInsumo[] | ArticuloManufacturado[];
}

export default function GrillaProductos({ articulos }: GrillaProductosProps) {

  if (articulos.length === 0) {
    return null;
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{ backgroundColor: "#f1f5df", padding: 4, height: 700, overflow: "hidden", overflowY: "scroll" }}
    >
      {articulos.map((item: ArticuloInsumo | ArticuloManufacturado) => (
        <Grid item xs={12} sm={12} md={3}>
          <ItemGrilla
            key={item.id}
            item={item}
          />
        </Grid>
      ))}
    </Grid>
  );
}
