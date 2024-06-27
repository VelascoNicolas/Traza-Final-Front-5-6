import useSWR, { SWRResponse } from "swr";
import Pedido from "../entidades/Pedido";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function getAllPedidos(): SWRResponse<Pedido[], any, any> {
    return useSWR<Pedido[]>("https://traza-final.onrender.com/pedidos", fetcher);
  }

  export function getPedidosCliente(clienteEmail: string): SWRResponse<Pedido[], any, any> {
    return useSWR<Pedido[]>(
      `https://traza-final.onrender.com/pedidos/cliente?userName=${clienteEmail}`,
      fetcher
    );
  }

  export async function savePedido(
    pedido: Pedido,
    setTotalPedido: (total: number) => void,
    vaciarCarrrito: () => void,
    totalEnvio: number
  ) {
    const fetchData = async (url: string) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return response.json();
    };
  
    try {
      const [empleado] = await Promise.all([
        fetchData("https://traza-final.onrender.com/empleado/1"),
      ]);
  
      
      pedido.empleado = empleado;
   
  
      const options = {
        mode: "cors" as RequestMode,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pedido),
      };
  
      const response = await fetch(
        `https://traza-final.onrender.com/pedidos?precioDelivery=${totalEnvio}`,
        options
      );
      if (response.ok) {
        alert("Pedido cargado correctamente.");
        vaciarCarrrito();
        setTotalPedido(0);
      } else {
        alert("Error al cargar pedido: " + response.status);
      }
    } catch (error) {
      //@ts-ignore
      alert(`Error: ${error.message}`);
    }
  }

  export async function editPedido(id: number, estado: string) {
    // Preparar llamada API
    let options = {
      mode: "cors" as RequestMode,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(estado),
    };
  
    // Manejo de errores
    try {
      let response = await fetch(
        `https://traza-final.onrender.com/pedidos/${id}`,
        options
      );
      if (response.ok) {
        if(estado === "FACTURADO") {
          sendFactura(id)
        }
        alert("Pedido actualizado correctamente.");
  
      } else {
        alert("Error al actualizar pedido: " + response.status);
      }
    } catch (error) {
      alert("Error CORS, Revisa la URL o el back está mal configurado.");
    }
  }
  export async function sendFactura(id: Number) {
    //Preparar llamada api
    let options = {
      mode: "cors" as RequestMode,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      }
    };
    try {
      let response = await fetch(
        `https://traza-final.onrender.com/pedidos/${id}`,
        options
      );
      if (response.ok) {
        alert("Se envio correctamente el id");
      } else {
        alert("Error al enviar el correo: " + response.status);
      }
    } catch {
      alert("Error CORS, Revisa la URL o el back esta mal configurado.");
    }
  }