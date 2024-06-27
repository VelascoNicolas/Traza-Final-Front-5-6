import useSWR, { SWRResponse } from "swr";
import UnidadMedida from "../entidades/UnidadMedida";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export function getAllUnidadMedida(): SWRResponse<UnidadMedida[], any, any> {
  return useSWR<UnidadMedida[]>(
    `https://traza-final.onrender.com/unidadMedida`,
    fetcher
  );
}
export async function saveUnidadMedida(uMedida: UnidadMedida) {
  //Preparar llamada api
  let options = {
    mode: "cors" as RequestMode,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(uMedida),
  };

  //Manejo de errores
  try {
    let response = await fetch(
      "https://traza-final.onrender.com/unidadMedida",
      options
    );
    if (response.ok) {
      alert("Unidad de medida agregada correctamente.");
    } else {
      alert("Error al agregar unidad de medida: " + response.status);
    }
  } catch {
    alert("Error CORS, Revisa la URL o el back esta mal configurado.");
  }
}
export async function editUnidadMedida(uMedida: UnidadMedida) {
    //Preparar llamada api
    let options = {
      mode: "cors" as RequestMode,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uMedida),
    };
  
    //Manejo de errores
    try {
      let response = await fetch(
        `https://traza-final.onrender.com/unidadMedida/${uMedida.id}`,
        options
      );
      if (response.ok) {
        alert("Unidad de medida editada correctamente.");
      } else {
        alert("Error al agregar unidad de medida: " + response.status);
      }
    } catch {
      alert("Error CORS, Revisa la URL o el back esta mal configurado.");
    }
  }