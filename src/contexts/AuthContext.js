import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext({auth:''});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useLocalStorage('auth', {});

    const userLogin = (authData) => {
        setAuth(authData);
    }

    const userRegister = (authData) => {
        setAuth(authData);
    }


    const userLogout = () => {
        setAuth({});
    }

    return (
        <AuthContext.Provider value={{ auth, userLogin, userRegister, userLogout }}>
            {children}
        </ AuthContext.Provider >
    );
}