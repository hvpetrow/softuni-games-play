import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

export const Header = () => {
  const { auth } = useContext(AuthContext);

  return (
    <header>
      <h1>
        <Link className="home" to="/">
          GamesPlay
        </Link>
      </h1>
      <nav>
        {auth.email && <span>{auth.email}</span>}

        <Link to="/catalog">All games</Link>
        {auth.accessToken
          ? <div id="user">
            <Link to="/create">Create Game</Link>
            <Link to="/logout">Logout</Link>
          </div>
          : <div id="guest">
            <Link to="/login">Login</Link> 
            <Link to="/register">Register</Link>
          </div>
        }
      </nav>
    </header>
  );
}   