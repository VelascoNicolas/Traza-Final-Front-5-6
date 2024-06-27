import { CircularProgress, Grid } from "@mui/material";
import {
  getCategoriasIdSucursal,
  localData,
} from "../../../../servicios/FuncionesAPI";
import Categoria from "../../../../entidades/Categoria";
//import GrillaProductos from "./GrillaProductos";

export default function GrillaCategorias() {
  const idSucursal = localData.getSucursal("sucursal").id;
  const { data, isLoading, error } = getCategoriasIdSucursal(idSucursal);

  if (error)
    return (
      <>
        <h1>
          Ups! Ocurrio un error al obtener los menús. Reintente nuevamente en
          unos minutos
        </h1>
      </>
    );
  if (isLoading)
    return (
      <>
        <CircularProgress color="inherit" />
      </>
    );

  const categoriasFiltradas = data?.filter(
    (categoria) =>
      categoria.denominacion !== "Insumos" /*&& categoria.id !== 5*/
  );

  return (
    <Grid container sx={{ marginTop: 2 }} spacing={1}>
      {categoriasFiltradas?.map((item: Categoria) => (
        //<GrillaProductos key={item.id} articulos={item.articulos} />
          <>console.log({item});</>
      ))}
    </Grid>
  );
}
