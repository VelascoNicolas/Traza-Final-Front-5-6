import useSWR, { SWRResponse } from "swr";
import ArticuloManufacturado from "../entidades/ArticuloManufacturado";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export function getAllArticulosManufacturados(): SWRResponse<
  ArticuloManufacturado[],
  any,
  any
> {
  return useSWR<ArticuloManufacturado[]>(
    `https://traza-final.onrender.com/articuloManufacturado`,
    fetcher
  );
}

export function getArticulosManufacturadosIdSucursal(
  idSucursal: number
): SWRResponse<ArticuloManufacturado[], any, any> {
  return useSWR<ArticuloManufacturado[]>(
    `https://traza-final.onrender.com/articuloManufacturado/sucursal/${idSucursal}`,
    fetcher
  );
}

export async function saveArticuloManufacturado(
  articulo: ArticuloManufacturado
) {
  //Preparar llamada api
  let options = {
    mode: "cors" as RequestMode,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(articulo),
  };

  //Manejo de errores
  try {
    let response = await fetch(
      "https://traza-final.onrender.com/articuloManufacturado",
      options
    );
    if (response.ok) {
      alert("Artículo agregado correctamente.");
    } else {
      alert("Error al agregar artículo: " + response.status);
    }
  } catch {
    alert("Error CORS, Revisa la URL o el back esta mal configurado.");
  }
}

export async function editArticuloManufacturado(
    articulo: ArticuloManufacturado
  ) {
    //Preparar llamada api
    let options = {
      mode: "cors" as RequestMode,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(articulo),
    };
  
    //Manejo de errores
    try {
      let response = await fetch(
        `https://traza-final.onrender.com/articuloManufacturado/${articulo.id}`,
        options
      );
      if (response.ok) {
        alert("Artículo editado correctamente.");
      } else {
        alert("Error al editar artículo: " + response.status);
      }
    } catch {
      alert("Error CORS, Revisa la URL o el back esta mal configurado.");
    }
  }