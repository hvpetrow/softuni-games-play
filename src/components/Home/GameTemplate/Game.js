import { Link } from "react-router-dom";

export const Game = ({game}) => {
    return (
        <div className="game">
            <div className="image-wrap">
                <img src={game.imageUrl} alt="game img" />
            </div>
            <h3>{game.title}</h3>
            <div className="rating">
                <span>☆</span>
                <span>☆</span>
                <span>☆</span>
                <span>☆</span>
                <span>☆</span>
            </div>
            <div className="data-buttons">
                <Link to={`/details/${game._id}`} className="btn details-btn">
                    Details
                </Link>
            </div>
        </div>
    );
}