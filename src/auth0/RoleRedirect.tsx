import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RoleRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener roles del almacenamiento local
    const userRoles = JSON.parse(localStorage.getItem("userRoles") || "[]");

    // Verificar y redirigir según el primer rol encontrado
    if (userRoles && userRoles.length > 0) {
      if (userRoles.includes("COCINERO")) {
        navigate("/dashboard/pedidos");
      } else if (userRoles.includes("ADMINISTRADOR")) {
        navigate("/dashboard");
      } else if (userRoles.includes("CAJERO")) {
        navigate("/dashboard/pedidos");
      } else {
        navigate(window.location.pathname);
      }
    }
  }, [navigate]);

  return null;
};

export default RoleRedirect;
