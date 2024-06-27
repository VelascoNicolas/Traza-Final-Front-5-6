import { AddCircleOutline, Edit, Visibility } from "@mui/icons-material";
import { IconButton, ListItem, ListItemText, Stack } from "@mui/material";

interface ItemListCategoriaTypes {
  denominacion: string;
}

export default function ItemListCategoria({
  denominacion,
}: ItemListCategoriaTypes) {
  return (
    <>
      <ListItem
        secondaryAction={
          <Stack direction="row" spacing={2}>
            <IconButton edge="end" aria-label="Ver Articulos">
              <Visibility />
            </IconButton>
            <IconButton edge="end" aria-label="Ver Sucursales">
              <AddCircleOutline />
            </IconButton>
            <IconButton edge="end" aria-label="Agregar Subcategoria">
              <Visibility />
            </IconButton>
            <IconButton edge="end" aria-label="Editar">
              <Edit />
            </IconButton>
          </Stack>
        }
      >
        <ListItemText primary={denominacion} />
      </ListItem>
    </>
  );
}
