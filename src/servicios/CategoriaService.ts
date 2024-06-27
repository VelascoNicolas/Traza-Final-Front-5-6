import useSWR, { SWRResponse } from "swr";
import Categoria from "../entidades/Categoria";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export function getAllCategorias(): SWRResponse<Categoria[], any, any> {
  return useSWR<Categoria[]>(
    `https://traza-final.onrender.com/categoria`,
    fetcher
  );
}

export function getCategoriaId(
  idCategoria: number
): SWRResponse<Categoria, any, any> {
  return useSWR<Categoria>(
    `https://traza-final.onrender.com/categoria/${idCategoria}`,
    fetcher
  );
}

export async function saveCategoria(categoria: Categoria, idSucursal: number) {
  //Traer sucursal
  let sucursal;
  try {
    const response = await fetch(
      `https://traza-final.onrender.com/sucursal/${idSucursal}`
    );
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    sucursal = await response.json();
  } catch (error) {
    //@ts-ignore
    alert(`Error obteniendo la sucursal: ${error.message}`);
    return;
  }

  categoria.sucursales.push(sucursal);

  //Preparar llamada api
  let options = {
    mode: "cors" as RequestMode,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoria),
  };

  //Manejo de errores
  try {
    let response = await fetch(
      "https://traza-final.onrender.com/categoria/padre",
      options
    );
    if (response.ok) {
      alert("Categoría agregada correctamente.");
    } else {
      alert("Error al agregar categoría: " + response.status);
    }
  } catch {
    alert("Error CORS, Revisa la URL o el back esta mal configurado.");
  }
}

export async function editCategoria(categoria: Categoria) {
    //Preparar llamada api
    let options = {
      mode: "cors" as RequestMode,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoria),
    };
  
    //Manejo de errores
    try {
      let response = await fetch(
        `https://traza-final.onrender.com/categoria/padre/${categoria.id}`,
        options
      );
      if (response.ok) {
        alert("Categoría editada correctamente.");
      } else {
        alert("Error al editar categoría: " + response.status);
      }
    } catch {
      alert("Error CORS, Revisa la URL o el back esta mal configurado.");
    }
  }