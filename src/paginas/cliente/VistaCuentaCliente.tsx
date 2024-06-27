import { Container, Paper } from "@mui/material";
import ClienteLayout from "../../layouts/cliente/ClienteLayout";
import FormularioCliente from "../../componentes/ui/cliente/VistaCuentaCliente/FormularioCliente";
import { localData } from "../../servicios/FuncionesAPI";

export default function VistaCuentaCliente() {
  const cliente=localData.getCliente("Cliente");
  const idSucursal=localData.getSucursal('sucursal').id;

  return (
    <ClienteLayout>
      <Container>
        <Paper elevation={6} sx={{marginTop:2}}>
          <FormularioCliente cliente={cliente} idSucursal={idSucursal}/>
        </Paper>
      </Container>
    </ClienteLayout>
  );
}
