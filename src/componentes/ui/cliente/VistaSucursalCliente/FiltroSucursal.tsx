import {
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Localidad from "../../../../entidades/Localidad";
import Provincia from "../../../../entidades/Provincia";

interface FiltroSucursalTypes {
  idProvincia: number;
  idLocalidad: number;
  setIdProvincia: (item: number) => void;
  setIdLocalidad: (item: number) => void;
  provincias: Provincia[];
  localidades: Localidad[];
}

export default function FiltroSucursal({
  idProvincia,
  idLocalidad,
  setIdLocalidad,
  setIdProvincia,
  provincias,
  localidades,
}: FiltroSucursalTypes) {
  return (
    <Stack
      spacing={2}
      direction={{ xs: "column", sm: "column", md: "row" }}
      sx={{ padding: 2 }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Provincia</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Provincia"
          value={idProvincia}
          onChange={(e) => setIdProvincia(Number(e.target.value))}
        >
          <MenuItem value={0}>Selecciona una provincia</MenuItem>
          {provincias
            ?.sort((a, b) => a.nombre.localeCompare(b.nombre))
            .map((item: Provincia) => (
              <MenuItem value={item.id}>{item.nombre}</MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Localidad</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Localidad"
          disabled={idProvincia == 0}
          value={idLocalidad}
          onChange={(e) => setIdLocalidad(Number(e.target.value))}
        >
          <MenuItem value={0}>Selecciona una localidad</MenuItem>
          {localidades
            ?.sort((a, b) => a.nombre.localeCompare(b.nombre))
            .map((item: Localidad) => (
              <MenuItem value={item.id}>{item.nombre}</MenuItem>
            ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
