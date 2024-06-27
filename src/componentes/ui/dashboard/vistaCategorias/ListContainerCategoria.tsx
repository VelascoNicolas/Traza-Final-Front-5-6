import { Paper, List, ListItem, Stack, IconButton, ListItemText, Typography } from "@mui/material";
import Categoria from "../../../../entidades/Categoria";
import { editCategoria, getAllCategorias, getCategoriasIdSucursal } from "../../../../servicios/FuncionesAPI";
import { useState } from "react";
import { Edit } from "@mui/icons-material";
import EditarCategoriaModal from "./EditarCategoriaModal";

interface ListContainerCategoriaTypes {
  busqueda: string;
}

export default function ListContainerCategoria({ busqueda }: ListContainerCategoriaTypes) {
  const { data: categoriasSuc } = getCategoriasIdSucursal(1);
  const { data: allCategorias } = getAllCategorias();
  const [editingCategoria, setEditingCategoria] = useState<Categoria | null>(null);
  const [openEditar, setOpenEditar] = useState(false);
  const categoriasNoSuc = allCategorias?.filter((categoria: Categoria) =>
    !categoriasSuc?.some((catSuc: Categoria) => catSuc.id === categoria.id)
  );

  const handleSubmit = (categoria: Categoria) => {
    if (editingCategoria != null) {
      editCategoria(categoria);
      handleClose();
    }
  };

  const handleOpenEditar = (categoria: Categoria) => {
    setEditingCategoria(categoria);
    setOpenEditar(true);
  };

  const handleClose = () => {
    setEditingCategoria(null);
    setOpenEditar(false);
  };

  const categoriasSucFiltradas = categoriasSuc?.filter((item: Categoria) => {
    return (
      busqueda == "" ||
      item.denominacion.toLowerCase().includes(busqueda.toLowerCase())
    );
  });

  const categoriasNoSucFiltradas = categoriasNoSuc?.filter((item: Categoria) => {
    return (
      busqueda == "" ||
      item.denominacion.toLowerCase().includes(busqueda.toLowerCase())
    );
  });

  return (
    <>
      <Paper elevation={5} sx={{ marginTop: 2 }}>
        <Typography variant="h6" sx={{ padding: 2, backgroundColor: "#f5f5f5" }}>
          Categorías de la sucursal
        </Typography>
        <List sx={{ backgroundColor: "white" }}>



          {categoriasSucFiltradas?.sort((a, b) => a.denominacion.localeCompare(b.denominacion))
          .map((item: Categoria) => (

            <ListItem
              key={item.id}
              secondaryAction={
                <Stack direction="row" spacing={2}>
                  <IconButton edge="end" aria-label="Editar" onClick={() => handleOpenEditar(item)}>
                    <Edit />
                  </IconButton>
                </Stack>
              }
            >
              <ListItemText primary={item.denominacion} />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Paper elevation={5} sx={{ marginTop: 2 }}>
        <Typography variant="h6" sx={{ padding: 2, backgroundColor: "#f5f5f5" }}>
          Categorías de otras sucursales
        </Typography>
        <List sx={{ backgroundColor: "white" }}>



          {categoriasNoSucFiltradas?.sort((a, b) => a.denominacion.localeCompare(b.denominacion))
          .map((item: Categoria) => (

            <ListItem
              key={item.id}
              secondaryAction={
                <Stack direction="row" spacing={2}>
                  <IconButton edge="end" aria-label="Editar" onClick={() => handleOpenEditar(item)}>
                    <Edit />
                  </IconButton>
                </Stack>
              }
            >
              <ListItemText primary={item.denominacion} />
            </ListItem>
          ))}
        </List>
      </Paper>
      
      {openEditar && editingCategoria && (
        <EditarCategoriaModal
          open={openEditar}
          onClose={handleClose}
          onSubmit={handleSubmit}
          iCategoria={editingCategoria}
        />
      )}
    </>
  )
}