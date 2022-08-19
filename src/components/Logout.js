import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import * as authService from '../services/authService';

export const Logout = () => {
    const navigate = useNavigate();
    const { auth,userLogout } = useContext(AuthContext);

    authService.logout(auth.accessToken)
        .then(() => {
            userLogout();
            navigate('/', { replace: true });
        })
        .catch(() => {
            navigate('/', { replace: true });
        });

    return null;
}