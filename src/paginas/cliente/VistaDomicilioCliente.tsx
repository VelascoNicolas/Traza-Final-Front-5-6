import { Box, Container, Typography } from "@mui/material";
import ClienteLayout from "../../layouts/cliente/ClienteLayout";
import DomicilioContainer from "../../componentes/ui/cliente/VistaDomiciliosCliente/DomiciliosContainer";
import BotonAgregarDomicilio from "../../componentes/ui/cliente/VistaDomiciliosCliente/BotonAgregarDomicilio";
import { useState } from "react";
import ModalDomicilio from "../../componentes/ui/cliente/VistaDomiciliosCliente/ModalDomicilio";
import Domicilio from "../../entidades/Domicilio";

export default function VistaDomicilioCliente() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <ClienteLayout estado={open} setEstado={setOpen}>
      <Box
        component="div"
        sx={{
          backgroundColor: "#282828",
          marginBottom: 2,
          padding: 2,
        }}
      >
        <Typography variant="h5" color={"white"} textAlign={"center"}>
          Aqui podras ver todos tus domicilios
        </Typography>
      </Box>
      <Container>
        <BotonAgregarDomicilio open={open} setOpen={setOpen} />
        <DomicilioContainer />
        <ModalDomicilio open={open} setOpen={setOpen} domiObj={new Domicilio()} editFlag={false}/>
      </Container>
    </ClienteLayout>
  );
}
