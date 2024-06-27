import { Button, Grid } from "@mui/material";
import ArticuloManufacturado from "../../../../entidades/ArticuloManufacturado";
import { editArticuloManufacturado, getAllArticulosManufacturados } from "../../../../servicios/FuncionesAPI";
import ItemGrillaProducto from "./ItemGrillaProducto";
import { useState } from "react";
import AgregarProductoModal from "./AgregarProductoModal";
import { Edit } from "@mui/icons-material";

interface GrillaProductoTypes {
  busqueda: string;
}

export default function GrillaProducto({ busqueda }: GrillaProductoTypes) {
  const { data: articuloManufacturados } = getAllArticulosManufacturados();
  const [editingArtMan, setEditingArtMan] = useState<ArticuloManufacturado | null>(null);
  const [openEditar, setOpenEditar] = useState(false);

  const handleOpenEditar = (artMan: ArticuloManufacturado) => {
    setEditingArtMan(artMan);
    setOpenEditar(true);
  };

  const handleCloseEditar = () => {
    setEditingArtMan(null);
    setOpenEditar(false);
  };

  const handleSubmit = (articuloM: ArticuloManufacturado) => {
    if (editingArtMan != null) {
      editArticuloManufacturado(articuloM);
      handleCloseEditar();
    }
  };

  const artManuFiltrados = articuloManufacturados?.filter((item: ArticuloManufacturado) => {
    return (
      busqueda == "" ||
      item.denominacion.toLowerCase().includes(busqueda.toLowerCase())
    );
  }
  );

  return (
    <>
      <Grid container sx={{ marginTop: 2 }} spacing={1}>

        {artManuFiltrados?.sort((a, b) => a.denominacion.localeCompare(b.denominacion))
          .map((item: ArticuloManufacturado) => (
            <ItemGrillaProducto
              key={item.id}
              nombre={item.denominacion}
              urlImagen={item.imagenes[0].url}
              precio={"$" + item.precioVenta + ".00"}
              tiempoCoccion={"Tiempo de cocción estimado: " + item.tiempoEstimadoMinutos + " minutos."}
            >
              <Button size="small" variant="contained" startIcon={<Edit />} onClick={() => handleOpenEditar(item)}>Ver Info / Editar</Button>
            </ItemGrillaProducto>
          ))}
      </Grid>
      {editingArtMan && (
        <AgregarProductoModal
          open={openEditar}
          onClose={handleCloseEditar}
          onSubmit={handleSubmit}
          iArticuloM={editingArtMan}
        />
      )}
    </>

  );
}
