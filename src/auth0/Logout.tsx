// En el archivo "Logout.tsx" (o donde tengas definido LogOutButton)
import { useAuth0 } from "@auth0/auth0-react";
import { Logout } from "@mui/icons-material";
import { localData } from "../servicios/FuncionesAPI";

export const LogOutButton = () => {
    const { logout } = useAuth0();

    return (
        <button onClick={() =>{
            logout({ logoutParams: { returnTo: window.location.origin }});
            localData.removeCliente("Cliente");
            }}>
            <Logout />
        </button>
    );
};

export default LogOutButton;