import useSWR, { SWRResponse } from "swr";
import Localidad from "../entidades/Localidad";
import Provincia from "../entidades/Provincia";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export function getProvinciasIdPais(
  idPais: number
): SWRResponse<Provincia[], any, any> {
  return useSWR<Provincia[]>(
    `https://traza-final.onrender.com/provincia/findByPais/${idPais}`,
    fetcher
  );
}

export function getLocalidadesIdProvincia(
  idProvincia: number
): SWRResponse<Localidad[], any, any> {
  return useSWR<Localidad[]>(
    `https://traza-final.onrender.com/localidad/findByProvincia/${idProvincia}`,
    fetcher
  );
}
