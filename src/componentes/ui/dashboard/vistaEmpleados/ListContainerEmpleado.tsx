import { Avatar, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Empleado from "../../../../entidades/Empleado";
import { bajaEmpleado, editEmpleado, getAllEmpleados } from "../../../../servicios/FuncionesAPI";
import { useState } from "react";
import { Edit } from "@mui/icons-material";
import AgregarEmpleadoModal from "./AgregarEmpleadoModal";

interface ListContainerEmpleadoTypes {
  busqueda: string;
}

export default function ListContainerEmpleado({ busqueda }: ListContainerEmpleadoTypes) {
  const { data: empleados } = getAllEmpleados();
  const [editingEmpleado, setEditingEmpleado] = useState<Empleado | null>(null);
  const [openEditar, setOpenEditar] = useState(false);

  const handleSubmit = (empleado: Empleado) => {
    if (editingEmpleado != null) {
      editEmpleado(empleado);
      handleClose();
    }
  };

  const handleOpenEditar = (empleado: Empleado) => {
    setEditingEmpleado(empleado);
    setOpenEditar(true);
  };

  const handleClose = () => {
    setEditingEmpleado(null);
    setOpenEditar(false);
  };

  const handleDelete = (empleado: Empleado) => {
    bajaEmpleado(empleado);
  }

  const empleadosFiltrados = empleados?.filter((item) => {
    return (
      busqueda == "" || item.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
  });

  function stringAvatar(nombre: string, apellido: string) {
    const nombreInicial = nombre.split(" ")[0]?.[0] || "";
    const apellidoInicial = apellido.split(" ")[0]?.[0] || "";
    return {
      children: `${nombreInicial}${apellidoInicial}`,
    };
  }

  return (
    <>
      <Paper elevation={5} sx={{ marginTop: 2 }}>
        <Typography variant="h6" sx={{ padding: 2, backgroundColor: "#f5f5f5" }}>
          Empleados
        </Typography>
        <List sx={{ backgroundColor: "white" }}>
          {empleadosFiltrados?.sort((a, b) => a.nombre.localeCompare(b.nombre))
            .map((item: Empleado) => (
              <>
                <ListItem
                  secondaryAction={
                    <>
                      <IconButton edge="end" aria-label="Editar" onClick={() => handleOpenEditar(item)}>
                        <Edit />
                      </IconButton>
                      <IconButton aria-label="Eliminar" onClick={() => handleDelete(item)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemAvatar>
                    <Avatar {...stringAvatar(item.nombre, item.apellido)} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.nombre + " " + item.apellido}
                    secondary={`Rol: ${item.rol}`}
                  ></ListItemText>
                </ListItem>
                <Divider />
              </>
            ))}
        </List>
      </Paper>
      {openEditar && editingEmpleado && (
        <AgregarEmpleadoModal
          open={openEditar}
          onClose={handleClose}
          onSubmit={handleSubmit}
          iEmpleado={editingEmpleado}
        />
      )}
    </>
  );
}
