import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { jwtDecode } from "jwt-decode";
import { localData } from '../servicios/FuncionesAPI';

interface DecodedToken {
  "https://my-app.example.com/roles"?: string[];
  [key: string]: any;
}

const PostLogin = () => {
  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const navigate = useNavigate();
  const sucursal = localData.getSucursal("sucursal")

  useEffect(() => {
    const processToken = async () => {
      if (isAuthenticated) {
        try {
          const tokenClaims = await getIdTokenClaims();
          const token = tokenClaims!.__raw;
          const decodedToken = jwtDecode<DecodedToken>(token);
          const roles = decodedToken["https://my-app.example.com/roles"];
      


          if (roles) {
            localData.setRol("userRoles", roles);
            // Verificar y redirigir según el primer rol encontrado
            if (roles.includes("COCINERO")) {
              navigate("/dashboard/pedidos", { replace: true });
            } else if (roles.includes("ADMIN")) {
              navigate("/dashboard", { replace: true });
            } else if (roles.includes("CAJERO")) {
              navigate("/dashboard/pedidos", { replace: true });
            } else if (roles.includes("DELIVERY")) {
              navigate("/dashboard/pedidos", { replace: true });
            } else {
              navigate(`/cliente/sucursal/${sucursal.id}`, { replace: true });
            }
          }
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      } else {
        localStorage.setItem("userRoles", "");
      }
    };

    processToken();
  }, [isAuthenticated, getIdTokenClaims, navigate]);

  return null;
};

export default PostLogin;
