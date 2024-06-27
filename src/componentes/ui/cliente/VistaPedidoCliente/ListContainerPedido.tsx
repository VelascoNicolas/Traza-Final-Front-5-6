import { List } from "@mui/material";
import ListItemPedido from "./ListItemPedido";
import DetallePedido from "../../../../entidades/DetallePedido";
import { useContext } from "react";
import { CarritoContext } from "../../../../context/CarritoContext";

export default function ListContainerPedido() {
  const {carrito} = useContext(CarritoContext);
  return (
    <List sx={{ maxHeight: 450, overflow: "hidden", overflowY: "scroll" }}>
      {carrito.map((item:DetallePedido,index:number)=>(
        <ListItemPedido key={index} objeto={item} />
      ))}

    </List>
  );
}
