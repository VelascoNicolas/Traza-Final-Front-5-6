import useSWR, { SWRResponse } from "swr";
import Localidad from "../entidades/Localidad";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function getLocalidadesIdProvincia(
  idProvincia: number
): SWRResponse<Localidad[], any, any> {
  return useSWR<Localidad[]>(
    `https://traza-final.onrender.com/localidad/findByProvincia/${idProvincia}`,
    fetcher
  );
}

export function getLocalidadesId(
  idLocalidad: number
): SWRResponse<Localidad[], any, any> {
  return useSWR<Localidad[]>(
    `https://traza-final.onrender.com/localidad/${idLocalidad}`,
    fetcher
  );
}
