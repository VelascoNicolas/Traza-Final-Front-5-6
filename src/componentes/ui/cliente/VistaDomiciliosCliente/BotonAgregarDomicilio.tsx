import { Button } from "@mui/material";

interface BotonAgregarDomicilioTypes{
    open:boolean;
    setOpen:(item:boolean)=>void;
}

export default function BotonAgregarDomicilio({open,setOpen}:BotonAgregarDomicilioTypes){
    return(
        <Button variant="contained" onClick={()=>setOpen(!open)}>Agregar Domicilio</Button>
    )
}