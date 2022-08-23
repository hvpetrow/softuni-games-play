import { Navigate,Outlet } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const RouteGuard = () => {
    const {isAuthenticated} = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to='/login' replace/>
    }

    return <Outlet />
};

export default RouteGuard;