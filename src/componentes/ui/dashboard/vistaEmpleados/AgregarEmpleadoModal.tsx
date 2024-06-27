import { useState } from "react";
import { Modal, Box, TextField, Stack, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import Empleado from "../../../../entidades/Empleado";
import { saveEmpleado } from "../../../../servicios/FuncionesAPI";

interface AgregarEmpleadoModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (empleado: Empleado) => void;
  iEmpleado: Empleado;
}

let errorTelefono = false;
let errorNombre = false;
let errorEmail = false;
let errorTipo = false;
let errorFecha = false;

//@ts-ignore
function validateTelefono(e) {
  const aux = /^\d{7,14}$/;
  if (!aux.test(e.target.value)) {
    errorTelefono = true;
  } else {
    errorTelefono = false;
  }
}

//@ts-ignore
function validateEmail(e) {
  const aux = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (!aux.test(e.target.value)) {
    errorEmail = true;
  } else {
    errorEmail = false;
  }
}

//@ts-ignore
function validateNombre(e) {
  let aux = e.target.value
  if (aux.length > 50 || aux.length < 1) {
    errorNombre = true;
  } else {
    errorNombre = false;
  }
}

//@ts-ignore
function validateTipo(e) {
  if (!e.target.value) {
    errorTipo = true;
  } else {
    errorTipo = false;
  }
}

//@ts-ignore
function validateFecha(e) {
  if (e.target.value > Date.now()) {
    errorTipo = true;
  } else {
    errorTipo = false;
  }
}

function AgregarEmpleadoModal({ open, onClose, iEmpleado }: AgregarEmpleadoModalProps) {
  const [empleado, setEmpleado] = useState<Empleado>(iEmpleado);

  const handleSubmit = (empleado: Empleado) => {
    saveEmpleado(empleado);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          minWidth: 325,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box
          component="form"
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(empleado);
          }}
        >
          <Stack spacing={2}>
            <TextField
              required
              label="Nombre"
              variant="outlined"
              value={empleado.nombre}
              onInput={validateNombre}
              onChange={(e) => setEmpleado({ ...empleado, nombre: e.target.value })}
            />
            {errorNombre && <span style={{ color: "red" }}>Formato de Nombre Inválido!</span>}
            <TextField
              required
              label="Apellido"
              variant="outlined"
              value={empleado.apellido}
              onInput={validateNombre}
              onChange={(e) => setEmpleado({ ...empleado, apellido: e.target.value })}
            />
            {errorNombre && <span style={{ color: "red" }}>Formato de Apellido Inválido!</span>}
            <TextField
              required
              label="Teléfono"
              variant="outlined"
              value={empleado.telefono}
              onChange={(e) => setEmpleado({ ...empleado, telefono: e.target.value })}
              onInput={validateTelefono}
            />
            {errorTelefono && <span style={{ color: "red" }}>Formato de Teléfono Inválido!</span>}
            <TextField
              required
              label="Email"
              variant="outlined"
              value={empleado.email}
              onChange={(e) => setEmpleado({ ...empleado, email: e.target.value })}
              onInput={validateEmail}
            />
            {errorEmail && <span style={{ color: "red" }}>Formato de Email Inválido!</span>}
            <FormControl variant="outlined">
              <InputLabel id="tipoEmpleado-label">Tipo de Empleado</InputLabel>
              <Select
                required
                label="Tipo de Empleado"
                variant="outlined"
                value={empleado.rol}
                onChange={(e) => setEmpleado({ ...empleado, rol: e.target.value })}
                onInput={validateTipo}
              >
                <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
                <MenuItem value={"CAJERO"}>CAJERO</MenuItem>
                <MenuItem value={"COCINERO"}>COCINERO</MenuItem>
                <MenuItem value={"DELIVERY"}>DELIVERY</MenuItem>
              </Select>
            </FormControl>
            {errorTipo && <span style={{ color: "red" }}>Seleccione un tipo de Empleado!</span>}
            <TextField
              required
              label="Fecha de Nacimiento"
              variant="outlined"
              type="date"
              value={empleado.fechaNacimiento}
              onChange={(e) => setEmpleado({ ...empleado, fechaNacimiento: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {errorFecha && <span style={{ color: "red" }}>Ingrese una fecha posible!</span>}
            <Button variant="contained" color="primary" type="submit" id="save" disabled={errorEmail || errorTelefono || errorNombre || errorTipo || errorFecha}>
              Guardar
            </Button>
            <Button variant="contained" color="secondary" onClick={onClose}>
              Cancelar
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal >
  );
}

export default AgregarEmpleadoModal;