import { useNavigate } from 'react-router-dom';
import * as authService from '../services/authService';

export const Logout = () => {
    const navigate = useNavigate();

    authService.logout()
    .then(() => {
        navigate('/',{replace:true});
    })
    .catch(() => {
        navigate('/',{replace:true});

    });

    return null;
}