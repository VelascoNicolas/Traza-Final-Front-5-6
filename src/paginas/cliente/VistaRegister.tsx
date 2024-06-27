import { useAuth0 } from "@auth0/auth0-react";
import { CircularProgress, Container } from "@mui/material";
import FormRegistro from "../../componentes/ui/cliente/FormRegistro";


export default function FormRegister() {
  const { user, isLoading: userLoading } = useAuth0();

  if(userLoading){
    return <CircularProgress />
  }
  return(
    <Container>
      <FormRegistro userEmail={String(user?.email)} />
    </Container>
  )
  
}
