import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import Domicilio from "../../../../entidades/Domicilio";
import {
  editCliente,
  getLocalidadesIdProvincia,
  getProvinciasIdPais,
  localData,
} from "../../../../servicios/FuncionesAPI";

interface ModalDomicilioTypes {
  open: boolean;
  setOpen: (item: boolean) => void;
  domiObj: Domicilio;
  editFlag: boolean;
}

export default function ModalDomicilio({
  open,
  setOpen,
  domiObj,
  editFlag,
}: ModalDomicilioTypes) {
  const [check, setChecked] = useState<boolean>(false);
  const cliente = localData.getCliente("Cliente");
  const [domicilio, setDomicilio] = useState<Domicilio>(domiObj);
  const [provincia, setProvincia] = useState(domicilio.localidad.provincia.id);
  const [localidad, setLocalidad] = useState(domicilio.localidad.id);
  const { data: provincias } = getProvinciasIdPais(1);
  const { data: localidades } = getLocalidadesIdProvincia(provincia);

  const handleProvinciaChange = (event: SelectChangeEvent<number>) => {
    setProvincia(event.target.value as number);
    setLocalidad(0);
  };

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const selectedLocalidad = localidades?.find((loc) => loc.id === localidad);

    if (!selectedLocalidad || !cliente) {
      console.error("La localidad seleccionada es inválida.");
      return;
    }

    const updatedDomicilio = {
      ...domicilio,
      localidad: selectedLocalidad,
    };

    setDomicilio(updatedDomicilio);
    if (editFlag) {
      let listDomicilios = cliente.domicilios.filter(
        (domi: Domicilio) => domi.id != updatedDomicilio.id
      );
      listDomicilios.push(updatedDomicilio);
      cliente.domicilios = listDomicilios;
      if (await editCliente(cliente)) {
        localData.removeCliente("Cliente");
        localData.setCliente("Cliente", cliente);
        setOpen(!open);
      }
      return;
    } else {
      cliente.domicilios.push(updatedDomicilio);
      console.log(JSON.stringify(cliente));
      if (await editCliente(cliente)) {
        localData.removeCliente("Cliente");
        localData.setCliente("Cliente", cliente);
        setOpen(!open);
      }
      return;
    }
  };
  return (
    <Modal open={open} onClose={() => setOpen(!open)}>
      <Paper
        elevation={5}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          minWidth: 360,
          maxWidth: "90vw", // Para que la modal no sea demasiado ancha en pantallas pequeñas
          maxHeight: "90vh", // Limitar la altura máxima al 90% de la altura de la ventana
          overflow: "auto", // Hacer que el contenido dentro del Box sea desplazable
        }}
      >
        <Box component="form" autoComplete="off" onSubmit={(e) => onSubmit(e)}>
          <Typography variant="h4" sx={{ marginBottom: 1 }}>
            Agregar un nuevo domicilio
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Calle"
              required
              value={domicilio.calle}
              onChange={(e) =>
                setDomicilio({ ...domicilio, calle: e.target.value })
              }
            />
            <TextField
              label="Numero"
              required
              value={domicilio.numero}
              onChange={(e) =>
                setDomicilio({ ...domicilio, numero: Number(e.target.value) })
              }
            />
            <TextField
              label="Codigo Postal"
              required
              type="number"
              value={domicilio.cp}
              onChange={(e) =>
                setDomicilio({ ...domicilio, cp: Number(e.target.value) })
              }
            />
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                checked={check}
                onChange={() => setChecked(!check)}
                label="Vivis en un departamento?"
              />
            </FormGroup>
            <Box component="div" sx={check ? {} : { display: "none" }}>
              <Stack spacing={2}>
                <TextField
                  label="Numero Piso"
                  required={check}
                  type="number"
                  value={domicilio.piso}
                  onChange={(e) =>
                    setDomicilio({ ...domicilio, piso: Number(e.target.value) })
                  }
                />
                <TextField
                  label="Numero Departamento"
                  required={check}
                  type="number"
                  value={domicilio.nroDpto}
                  onChange={(e) =>
                    setDomicilio({
                      ...domicilio,
                      nroDpto: Number(e.target.value),
                    })
                  }
                />
              </Stack>
            </Box>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="provincia-label">Provincia</InputLabel>
              <Select
                required
                labelId="provincia-label"
                value={provincia}
                onChange={handleProvinciaChange}
                label="Provincia"
              >
                <MenuItem value={0}>Selecciona una provincia</MenuItem>
                {provincias
                  ?.sort((a, b) => a.nombre.localeCompare(b.nombre))
                  .map((provincia) => (
                    <MenuItem key={provincia.id} value={provincia.id}>
                      {provincia.nombre}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl fullWidth variant="outlined" disabled={!provincia}>
              <InputLabel id="localidad-label">Localidad</InputLabel>
              <Select
                required
                labelId="localidad-label"
                value={localidad}
                onChange={(e) => setLocalidad(e.target.value as number)}
                label="Localidad"
              >
                <MenuItem value={0}>Selecciona una localidad</MenuItem>
                {localidades
                  ?.sort((a, b) => a.nombre.localeCompare(b.nombre))
                  .map((localidad) => (
                    <MenuItem key={localidad.id} value={localidad.id}>
                      {localidad.nombre}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Button type="submit" variant="contained">
              Guardar Domicilio
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Modal>
  );
}
