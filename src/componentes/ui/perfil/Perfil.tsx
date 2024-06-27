import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import  { JwtPayload } from "jwt-decode";
import { jwtDecode } from 'jwt-decode';

// Define the interface for the decoded token
interface DecodedToken extends JwtPayload {
    name?: string; // Example: if you expect the token to have a 'name' field
    email?: string; // Example: if you expect the token to have an 'email' field
    [key: string]: any; // Include any other additional properties you expect in the token
}

export const Perfil = () => {
    const { user, isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();
    const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);

    useEffect(() => {
        const decodeToken = async () => {
            if (isAuthenticated) {
                try {
                    const tokenClaims = await getIdTokenClaims();
                    const token = tokenClaims!.__raw; // Get the token as a string
                    const decoded = jwtDecode<DecodedToken>(token); // Decode the token
                    setDecodedToken(decoded); // Save the decoded token in the state
                } catch (error) {
                    console.error("Error decoding token:", error);
                }
            }
        };

        decodeToken();
    }, [isAuthenticated, getIdTokenClaims]);

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
                            <pre>{JSON.stringify(decodedToken, null, 2)}</pre> {/* Display the decoded claims */}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
