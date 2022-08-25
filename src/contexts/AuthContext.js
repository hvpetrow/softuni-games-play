import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext();

//Custom Hook
export const useAuthContext = () => {
    const context = useContext(AuthContext);
}

//with HOC
export const withAuth = (Component) => {
    const WrapperComponent = (props) => {
        const context = useContext(AuthContext);
        return <Component {...props} auth={context}> </Component>
    }

    return WrapperComponent;
}

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
        <AuthContext.Provider value={{ auth, userLogin, userRegister, userLogout,isAuthenticated: !!auth.accessToken }}>
            {children}
        </ AuthContext.Provider >
    );
}