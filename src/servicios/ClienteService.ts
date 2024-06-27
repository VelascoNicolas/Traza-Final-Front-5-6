import useSWR, { SWRResponse } from "swr";
import Cliente from "../entidades/Cliente";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export function getClienteEmail(
  clienteEmail: string | undefined
): SWRResponse<Cliente, any, any> {
  if (clienteEmail != undefined) {
    return useSWR<Cliente>(
      `https://traza-final.onrender.com/cliente/${clienteEmail}`,
      fetcher
    );
  }
  return useSWR<Cliente>(null, fetcher);
}

export function getClienteId(
  idCliente: string
): SWRResponse<Cliente, any, any> {
  return useSWR<Cliente>(
    `https://traza-final.onrender.com/cliente/${idCliente}`,
    fetcher
  );
}

export async function saveCliente(cliente: Cliente) {
  let options = {
    mode: "cors" as RequestMode,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cliente),
  };
  console.log(options.body);
  try {
    let response = await fetch(
      "https://traza-final.onrender.com/cliente",
      options
    );
    if (response.ok) {
      alert("Cliente Registrado");
      console.log(await response.json());
      window.location.replace("/");
    } else {
      console.log(await response.json());
      alert("Error al registrar el cliente");
    }
  } catch {
    alert("Ocurrio un error CORS");
  }
}

export async function editCliente(cliente: Cliente) {
  // Preparar llamada API
  let options = {
    mode: "cors" as RequestMode,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cliente),
  };

  // Manejo de errores
  try {
    let response = await fetch(
      `https://traza-final.onrender.com/cliente/${cliente.userName}`,
      options
    );
    if (response.ok) {
      alert("Cliente actualizado correctamente.");
      return true;
    } else {
      alert("Error al actualizar cliente: " + response.status);
      return false;
    }
  } catch (error) {
    alert("Error CORS, Revisa la URL o el back está mal configurado.");
    return false;
  }
}
