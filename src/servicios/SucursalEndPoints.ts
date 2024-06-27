import useSWR, { SWRResponse } from "swr";
import Sucursal from "../entidades/Sucursal";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function getAllSucursales(): SWRResponse<Sucursal[], any, any> {
  return useSWR<Sucursal[]>(
    "https://traza-final.onrender.com/sucursal",
    fetcher
  );
}

export function getSucursalesEmpresa(
  idEmpresa: number
): SWRResponse<Sucursal[], any, any> {
  return useSWR<Sucursal[]>(
    `https://traza-final.onrender.com/sucursal/empresa/${idEmpresa}`,
    fetcher
  );
}

export function getSucursalId(
  idSucursal: number
): SWRResponse<Sucursal, any, any> {
  return useSWR<Sucursal>(
    `https://traza-final.onrender.com/sucursal/${idSucursal}`,
    fetcher
  );
}

export async function saveSucursal(sucursal: Sucursal) {
  //Preparar llamada api
  let options = {
    mode: "cors" as RequestMode,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sucursal),
  };

  //Manejo de errores
  try {
    let response = await fetch(
      "https://traza-final.onrender.com/sucursal",
      options
    );
    if (response.ok) {
      alert("Sucursal agregada correctamente.");
    } else {
      alert("Error al agregar la sucursal: " + response.status);
    }
  } catch {
    alert("Error CORS, Revisa la URL o el back esta mal configurado.");
  }
}

export async function editSucursal(sucursal: Sucursal) {
    //Preparar llamada api
    let options = {
      mode: "cors" as RequestMode,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sucursal),
    };
  
    //Manejo de errores
    try {
      let response = await fetch(
        `https://traza-final.onrender.com/sucursal/${sucursal.id}`,
        options
      );
      if (response.ok) {
        alert("Sucursal editada correctamente.");
      } else {
        alert("Error al editar la sucursal: " + response.status);
      }
    } catch {
      alert("Error CORS, Revisa la URL o el back esta mal configurado.");
    }
  }