import { Link, useNavigate } from 'react-router-dom';
import * as authService from "../../services/authService";
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
export const Login = () => {
    const navigate = useNavigate();
    const { userLogin } = useContext(AuthContext);

    const onSubmit = async (e) => {
        e.preventDefault();

        const {
            email,
            password
        } = Object.fromEntries(new FormData(e.target));

        authService.login(email,password)
        .then(authData => {
            userLogin(authData);
            navigate('/');
        })
        .catch((error) => {
            const loginError = new Error('username or password don\'t match')
            console.log(error);
            alert(loginError.message);
            navigate('/404');
        })
    };

    return (
        <section id="login-page" className="auth">
            <form id="login" onSubmit={onSubmit}>
                <div className="container">
                    <div className="brand-logo" />
                    <h1>Login</h1>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Sokka@gmail.com"
                    />
                    <label htmlFor="login-pass">Password:</label>
                    <input type="password" id="login-password" name="password" />
                    <input type="submit" className="btn submit" value="Login" />
                    <p className="field">
                        <span>
                            If you don't have profile click <Link to="/register">here</Link>
                        </span>
                    </p>
                </div>
            </form>
        </section>
    );
}