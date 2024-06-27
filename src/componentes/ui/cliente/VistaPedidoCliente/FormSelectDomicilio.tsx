import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Domicilio from "../../../../entidades/Domicilio";

interface FormSelectDomicilioTypes{
  metodoEntrega:string;
  domicilio:number;
  setDomicilio:(item:number)=>void;
  domicilios:Domicilio[];
}

export default function FormSelectDomicilio({metodoEntrega,domicilio,setDomicilio,domicilios}:FormSelectDomicilioTypes) {
  
  return (
    <Box component="form" autoComplete="off" sx={{padding:2}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Domicilios</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Domicilios"
          value={domicilio}
          disabled={metodoEntrega==="TAKE_AWAY"}
          onChange={(e)=>setDomicilio(Number(e.target.value))}
        >
          <MenuItem value={0}>Selecciona un domicilio para enviar tu pedido</MenuItem>
          {domicilios.map((item:Domicilio,index:number)=>(
            <MenuItem key={index} value={item.id}>{item.calle} {item.numero} {item.localidad.nombre}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
