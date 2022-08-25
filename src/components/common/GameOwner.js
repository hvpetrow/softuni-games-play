import { useContext } from "react"
import { Navigate, Outlet, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { GameContext } from "../../contexts/GameContext"

const GameOwner = ({ children }) => {
    const { selectGame } = useContext(GameContext);
    const { auth,isAuthenticated } = useContext(AuthContext);
    const { gameId } = useParams();

    const currentGame = selectGame(gameId);
    
    if (currentGame === undefined) {
      return <Navigate to='/' replace/>;
        
    }

    if (!isAuthenticated && currentGame._ownerId !== auth._id) {
       
      return <Navigate to='/catalog' replace/>;
    }

    return children ? children : <Outlet />
}

export default GameOwner;