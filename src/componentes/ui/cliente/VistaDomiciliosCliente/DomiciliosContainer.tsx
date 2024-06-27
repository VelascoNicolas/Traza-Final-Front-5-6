import { Box, CircularProgress, Stack } from "@mui/material";
import DomicilioAcordeon from "./DomicilioAcordeon";
import {
  getClienteId,
  localData,
} from "../../../../servicios/FuncionesAPI";
import Domicilio from "../../../../entidades/Domicilio";

export default function DomicilioContainer() {
  const { data: cliente, isLoading } = getClienteId(
    localData.getCliente("Cliente").userName
  );
  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <Box component="div" sx={{ marginTop: 2 }}>
      <Stack spacing={2}>
        {cliente!.domicilios
          ?.sort((a, b) => b.id - a.id)
          .map((item: Domicilio,index:number) => (
            <>
              <DomicilioAcordeon key={index} iDomicilio={item} />
            </>
          ))}
      </Stack>
    </Box>
  );
}
