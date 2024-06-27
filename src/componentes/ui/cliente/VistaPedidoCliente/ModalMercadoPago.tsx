import { Modal, Paper } from "@mui/material"
import CheckOutMP from "../../../../utils/mercadoPago/CheckOutMP"

interface ModalMercadoPagoTypes{
    open:boolean,
    setOpen:(item:boolean)=>void
    preferenceID:string
}

export default function ModalMercadoPago({open,setOpen,preferenceID}:ModalMercadoPagoTypes){
    return(
        <Modal open={open} onClose={()=>setOpen(!open)}>
            <Paper elevation={5}>
                <CheckOutMP preferenceID={preferenceID}/>
            </Paper>
        </Modal>
    )
}