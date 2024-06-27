import useSWR, { SWRResponse } from "swr";
import Pais from "../entidades/Pais";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function getAllPaises(): SWRResponse<Pais[], any, any> {
  return useSWR<Pais[]>(`https://traza-final.onrender.com/pais`, fetcher);
}
