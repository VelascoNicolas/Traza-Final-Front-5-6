import { ArrowDownward } from "@mui/icons-material";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Domicilio from "../../../../entidades/Domicilio";
import { useState } from "react";
import {
  getLocalidadesIdProvincia,
  getProvinciasIdPais,
} from "../../../../servicios/FuncionesAPI";
import ModalDomicilio from "./ModalDomicilio";

interface DomicilioAcordeonTypes {
  iDomicilio: Domicilio;
}

export default function DomicilioAcordeon({
  iDomicilio,
}: DomicilioAcordeonTypes) {
  const [open,setOpen]=useState<boolean>(false);
  const vistaEscritorio: boolean = useMediaQuery("(min-width:600px)");
  const [domicilio, setDomicilio] = useState<Domicilio>(iDomicilio);
  const [provincia, setProvincia] = useState(domicilio.localidad.provincia.id);
  const [localidad, setLocalidad] = useState(domicilio.localidad.id);
  const { data: provincias } = getProvinciasIdPais(1);
  const { data: localidades } = getLocalidadesIdProvincia(provincia);

  const handleProvinciaChange = (event: SelectChangeEvent<number>) => {
    setProvincia(event.target.value as number);
    setLocalidad(0);
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ArrowDownward />}>
        <Typography>
          {domicilio.calle +
            " " +
            domicilio.numero +
            " " +
            domicilio.localidad.nombre}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction={"column"} spacing={2}>
          <Stack
            direction={{ xs: "column", sm: "column", md: "row" }}
            spacing={1}
          >
            <TextField
              inputProps={{ readOnly: true }}
              label="Calle"
              variant="outlined"
              value={domicilio.calle}
              onChange={(e) =>
                setDomicilio({ ...domicilio, calle: e.target.value })
              }
              sx={vistaEscritorio ? { width: 800 } : {}}
            />

            <TextField
              inputProps={{ readOnly: true }}
              label="Numero"
              type="number"
              variant="outlined"
              value={domicilio.numero}
              onChange={(e) =>
                setDomicilio({ ...domicilio, numero: Number(e.target.value) })
              }
              sx={vistaEscritorio ? { width: 300 } : {}}
            />
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "column", md: "row" }}
            spacing={1}
          >
            <TextField
              inputProps={{ readOnly: true }}
              label="Codigo Postal"
              type="number"
              variant="outlined"
              value={domicilio.cp}
              onChange={(e) =>
                setDomicilio({ ...domicilio, cp: Number(e.target.value) })
              }
              sx={vistaEscritorio ? { width: 365 } : {}}
            />

            <TextField
              inputProps={{ readOnly: true }}
              label="Numero Piso"
              type="number"
              variant="outlined"
              value={domicilio.piso}
              onChange={(e) =>
                setDomicilio({ ...domicilio, piso: Number(e.target.value) })
              }
              sx={vistaEscritorio ? { width: 365 } : {}}
            />

            <TextField
              inputProps={{ readOnly: true }}
              label="Numero Departamento"
              type="number"
              variant="outlined"
              value={domicilio.nroDpto}
              onChange={(e) =>
                setDomicilio({
                  ...domicilio,
                  nroDpto: Number(e.target.value),
                })
              }
              sx={vistaEscritorio ? { width: 365 } : {}}
            />
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "column", md: "row" }}
            spacing={1}
          >
            <FormControl fullWidth variant="outlined" disabled={!provincia}>
              <InputLabel id="localidad-label">Localidad</InputLabel>
              <Select
                required
                labelId="localidad-label"
                value={localidad}
                onChange={(e) => setLocalidad(e.target.value as number)}
                label="Localidad"
                inputProps={{ readOnly: true }}
              >
                {localidades
                  ?.sort((a, b) => a.nombre.localeCompare(b.nombre))
                  .map((localidad) => (
                    <MenuItem key={localidad.id} value={localidad.id}>
                      {localidad.nombre}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <FormControl fullWidth variant="outlined">
              <InputLabel id="provincia-label">Provincia</InputLabel>
              <Select
                labelId="provincia-label"
                value={provincia}
                onChange={handleProvinciaChange}
                label="Provincia"
                inputProps={{ readOnly: true }}
              >
                {provincias
                  ?.sort((a, b) => a.nombre.localeCompare(b.nombre))
                  .map((provincia) => (
                    <MenuItem key={provincia.id} value={provincia.id}>
                      {provincia.nombre}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Stack>
        </Stack>
      </AccordionDetails>
      <AccordionActions>
        <Button onClick={()=>setOpen(!open)}>Modificar</Button>
        <Button>Eliminar</Button>
      </AccordionActions>
      <ModalDomicilio open={open} setOpen={setOpen} domiObj={iDomicilio} editFlag={true}/>
    </Accordion>
  );
}
