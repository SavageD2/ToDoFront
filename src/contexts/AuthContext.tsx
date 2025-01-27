import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { login as authLogin, logout as authLogout, isAuthenticated } from "../services/authService";

interface AuthContextProps {
    isLoggedIn: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isAuthenticated());

    const login = async (email: string, password: string) => {
        await authLogin(email, password); // Gère la connexion et stocke le token via authService
        setIsLoggedIn(true); // Met à jour l'état pour indiquer que l'utilisateur est connecté
    };

    const logoutUser = () => {
        authLogout(); // Supprime le token via authService
        setIsLoggedIn(false); // Met à jour l'état pour indiquer la déconnexion
    };

    useEffect(() => {
        setIsLoggedIn(isAuthenticated()); // Synchronise l'état lors du montage du composant
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout: logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth doit être dans un AuthProvider");
    }
    return context;
};
