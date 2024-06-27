import useSWR, { SWRResponse } from "swr";
import Empresa from "../entidades/Empresa";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function getAllEmpresas(
  token: string | null
): SWRResponse<Empresa[], any, any> {
  //Una vez recibido el token llamamos a la funcion fetch de empresas
  if (token != null) {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const fetcher2 = (url: string) =>
      fetch(url, options).then((res) => res.json());
    return useSWR<Empresa[]>(
      "https://traza-final.onrender.com/empresa",
      fetcher2
    );
  }
  //Si el token es null ponemos en pausa a la funcion fetch
  return useSWR<Empresa[]>(null, fetcher);
}

export async function saveEmpresa(empresa: Empresa) {
  //Preparar llamada api
  let options = {
    mode: "cors" as RequestMode,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(empresa),
  };

  //Manejo de errores
  try {
    let response = await fetch(
      "https://traza-final.onrender.com/empresa",
      options
    );
    if (response.ok) {
      alert("Empresa agregada correctamente.");
    } else {
      alert("Error al agregar empresa: " + response.status);
    }
  } catch {
    alert("Error CORS, Revisa la URL o el back esta mal configurado.");
  }
}

export async function editEmpresa(empresa: Empresa) {
  //Preparar llamada api
  let options = {
    mode: "cors" as RequestMode,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(empresa),
  };
  //Manejo de errores
  try {
    let response = await fetch(
      `https://traza-final.onrender.com/empresa/${empresa.id}`,
      options
    );
    if (response.ok) {
      alert("Empresa editada correctamente");
    } else {
      alert("Error HTTP: " + response.status);
    }
  } catch {
    alert("Error CORS, Revisa la URL o el back esta mal configurado");
  }
}
