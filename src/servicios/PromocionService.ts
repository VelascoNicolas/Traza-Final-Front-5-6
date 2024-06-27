import useSWR, { SWRResponse } from "swr";
import Promocion from "../entidades/Promocion";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function getPromocionesIdSucursal(
  idSucursal: number
): SWRResponse<Promocion[], any, any> {
  return useSWR<Promocion[]>(
    `https://traza-final.onrender.com/promocion/sucursal/${idSucursal}`,
    fetcher
  );
}

export async function savePromocion(promocion: Promocion) {
  //Preparar llamada api
  let options = {
    mode: "cors" as RequestMode,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(promocion),
  };

  //Manejo de errores
  try {
    let response = await fetch(
      "https://traza-final.onrender.com/promocion",
      options
    );
    if (response.ok) {
      alert("Promoción agregada correctamente.");
    } else {
      alert("Error al agregar promoción: " + response.status);
    }
  } catch {
    alert("Error CORS, Revisa la URL o el back esta mal configurado.");
  }
}

export async function editPromocion(promocion: Promocion) {
  promocion.promocionDetalles.forEach((detalle) => {
    detalle.articuloId = detalle.articulo.id;
  });

  //Preparar llamada api
  let options = {
    mode: "cors" as RequestMode,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(promocion),
  };

  const hoy = new Date();
  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const dia = String(hoy.getDate()).padStart(2, "0");
  const fecha = `${anio}-${mes}-${dia}`;

  //Manejo de errores
  try {
    let response = await fetch(
      `https://traza-final.onrender.com/promocion/${promocion.id}?fechaActual=${fecha}`,
      options
    );
    if (response.ok) {
      alert("Promoción editada correctamente.");
    } else {
      alert("Error al editar promoción: " + response.status);
    }
  } catch {
    alert("Error CORS, Revisa la URL o el back esta mal configurado.");
  }
}
