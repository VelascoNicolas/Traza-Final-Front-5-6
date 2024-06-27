import { useState } from "react";
import { Modal, Box, TextField, Stack, Button } from "@mui/material";
import Empresa from "../../../../entidades/Empresa";

interface AgregarEmpresaModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (empresa: Empresa) => void;
  iEmpresa: Empresa;
}

let errorCuil = false;
let errorRazon = false;
let errorNombre = false;

//@ts-ignore
function validateCuil(e) {
  let aux = e.target.value
  const cuitRegex = /^(30|33|34)\d{8}\d$/;
  if (!cuitRegex.test(aux)) {
    errorCuil = true;
  } else {
    errorCuil = false;
  }
}

//@ts-ignore
function validateRazonSocial(e) {
  let aux = e.target.value
  if (aux.length>50 || aux.length<5) {
    errorRazon = true;
  } else {
    errorRazon = false;
  }
}

//@ts-ignore
function validateNombre(e) {
  let aux = e.target.value
  if (aux.length>50 || aux.length<1) {
    errorNombre = true;
  } else {
    errorNombre = false;
  }
}

function AgregarEmpresaModal({ open, onClose, onSubmit, iEmpresa }: AgregarEmpresaModalProps) {
  const [empresa, setEmpresa] = useState<Empresa>(iEmpresa);

  const handleSubmit = () => {
    onSubmit(empresa);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
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
            handleSubmit();
          }}
        >
          <Stack spacing={2}>
            <TextField
              required
              label="Nombre"
              variant="outlined"
              value={empresa.nombre}
              onInput={validateNombre}
              onChange={(e) => setEmpresa({ ...empresa, nombre: e.target.value })}
            />
            {errorNombre && <span style={{color : "red"}}>Formato de Nombre Inválido!</span>}
            <TextField
              required
              label="Razón Social"
              variant="outlined"
              value={empresa.razonSocial}
              onInput={validateRazonSocial}
              onChange={(e) => setEmpresa({ ...empresa, razonSocial: e.target.value })}
            />
            {errorRazon && <span style={{color : "red"}}>Formato de Razón Social Inválido!</span>}
            <TextField
              required
              label="CUIL"
              variant="outlined"
              value={empresa.cuil}
              onChange={(e) => setEmpresa({ ...empresa, cuil: Number(e.target.value) })}
              type="number"
              onInput={validateCuil}
              inputProps={{
                step: 1,
                min: 1,
                max: 999999999999999
              }}
            />
            {errorCuil && <span style={{color : "red"}}>Formato de Cuil Inválido!</span>}
            <Button variant="contained" color="primary" type="submit" id="save" disabled={errorCuil || errorRazon || errorNombre}>
              Guardar
            </Button>
            <Button variant="contained" color="secondary" onClick={onClose}>
              Cancelar
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
}

export default AgregarEmpresaModal;
