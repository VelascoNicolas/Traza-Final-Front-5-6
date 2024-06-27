import { Paper, List, ListItem, Stack, IconButton, ListItemText, Typography } from "@mui/material";
import UnidadMedida from "../../../../entidades/UnidadMedida";
import { editUnidadMedida, getAllUnidadMedida } from "../../../../servicios/FuncionesAPI";
import { useState } from "react";
import { Edit } from "@mui/icons-material";
import AgregarUnidadMedidaModal from "./AgregarUMedidaModal";

interface ListContainerUnidadMedidaTypes {
  busqueda: string;
}

export default function ListContainerUnidadMedida({ busqueda }: ListContainerUnidadMedidaTypes) {
  const { data: unidadesMedida } = getAllUnidadMedida();
  const [editingUnidadMedida, setEditingUnidadMedida] = useState<UnidadMedida | null>(null);
  const [openEditar, setOpenEditar] = useState(false);

  const handleSubmit = (unidadmedida: UnidadMedida) => {
    if (editingUnidadMedida != null) {
      editUnidadMedida(unidadmedida);
      handleClose();
    }
  };

  const handleOpenEditar = (unidadmedida: UnidadMedida) => {
    setEditingUnidadMedida(unidadmedida);
    setOpenEditar(true);
  };

  const handleClose = () => {
    setEditingUnidadMedida(null);
    setOpenEditar(false);
  };

  const unidadMedidaFiltradas = unidadesMedida?.filter((item: UnidadMedida) => {
    return (
      busqueda == "" ||
      item.denominacion.toLowerCase().includes(busqueda.toLowerCase())
    );
  });

  return (
    <>
      <Paper elevation={5} sx={{ marginTop: 2 }}>
        <Typography variant="h6" sx={{ padding: 2, backgroundColor: "#f5f5f5" }}>
          Unidades de medida
        </Typography>
        <List sx={{ backgroundColor: "white" }}>



          {unidadMedidaFiltradas?.sort((a, b) => a.denominacion.localeCompare(b.denominacion))
          .map((item: UnidadMedida) => (

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
      {openEditar && editingUnidadMedida && (
        <AgregarUnidadMedidaModal
          open={openEditar}
          onClose={handleClose}
          onSubmit={handleSubmit}
          iUnidadMedida={editingUnidadMedida}
        />
      )}
    </>
  )
}