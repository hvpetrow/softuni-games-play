import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GameContext } from "../../contexts/GameContext";
import { editGame, getOne } from "../../services/gameService";

export const Edit = () => {
    const [currentGame, setCurrentGame] = useState({});
    const { editGameHandler } = useContext(GameContext);
    const { gameId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getOne(gameId)
            .then(game => {
                setCurrentGame(game);
            })
    }, [gameId]);

    const onSubmit = (e) => {
        e.preventDefault();

        const editedGame = Object.fromEntries(new FormData(e.target));
        editedGame._id = currentGame._id;

        editGame(editedGame)
            .then(result => {
                editGameHandler(result);
                navigate(`/details/${result._id}`);
            });
    }

    return (
        <section id="edit-page" className="auth">
            <form id="edit" onSubmit={onSubmit}>
                <div className="container">
                    <h1>Edit Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" defaultValue={currentGame.title} />
                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" name="category" defaultValue={currentGame.category} />
                    <label htmlFor="levels">MaxLevel:</label>
                    <input
                        type="number"
                        id="maxLevel"
                        name="maxLevel"
                        min={1}
                        defaultValue={currentGame.maxLevel}
                    />
                    <label htmlFor="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" defaultValue={currentGame.imageUrl} />
                    <label htmlFor="summary">Summary:</label>
                    <textarea name="summary" id="summary" defaultValue={currentGame.summary} />
                    <input className="btn submit" type="submit" defaultValue="Edit Game" />
                </div>
            </form>
        </section>
    );
}