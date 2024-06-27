import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { JwtPayload, jwtDecode } from "jwt-decode";

interface DecodedToken extends JwtPayload {
    name?: string;
    email?: string;
    [key: string]: any;
}

export const Profile = () => {
    const { user, isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();
    const navigate = useNavigate();
    const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);

    useEffect(() => {
        const decodeToken = async () => {
                try {
                    const tokenClaims = await getIdTokenClaims();
                    const token = tokenClaims!.__raw; // Obtén el token en formato string
                    const decoded = jwtDecode<DecodedToken>(token); // Decodifica el token
                    setDecodedToken(decoded); // Guarda el token decodificado en el estado
                } catch (error) {
                    console.error("Error decoding token:", error);
                }
            
        };

        decodeToken();
    }, [isAuthenticated, navigate, getIdTokenClaims]);

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            {!isAuthenticated && <div>No estás autenticado.</div>}
            {isAuthenticated && user && (
                <div>
                    <h2>Perfil</h2>
                    <p>Nombre: {user.name}</p>
                    <p>Email: {user.email}</p>
                    {decodedToken && (
                        <div>
                            <h3>Claims:</h3>
                            <pre>{JSON.stringify(decodedToken, null, 2)}</pre> {/* Mostrar los claims descifrados */}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};