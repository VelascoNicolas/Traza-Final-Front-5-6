import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Login } from "@mui/icons-material";

export const LoginButton = () => {
    return (
        <Link to="#" className="btn btn-outline-light" onClick={() =>  useAuth0()}>
            Iniciar sesión / Registrarse&nbsp;
            <Login />
        </Link>
    );
};