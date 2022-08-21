import { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GameContext } from '../../contexts/GameContext';

export const Details = () => {
    const { games,addComment } = useContext(GameContext);
    const { gameId } = useParams();
    const [comment, setComment] = useState({
        username: '',
        comment: ''
    });

    const [err, setErr] = useState({
        username: '',
        comment: ''
    });

    const game = games.find(g => g._id === gameId);//game should coming from server(request)

    const addCommentHandler = (e) => {
        e.preventDefault();
        addComment(gameId, `${comment.username}: ${comment.comment}`);
    };

    const onChange = (e) => {
        setComment(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const validateUsername = (e) => {
        const username = e.target.value;
        let errorMessage = '';

        if (username.length < 4) {
            errorMessage = 'Username must be longer than 4 characters';
        } else if (username.length > 10) {
            errorMessage = 'Username must be shorter than 10 characters';
        }

        setErr(state => ({
            ...state,
            username: errorMessage
        }));
    }

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} alt="game-img" />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>
                <p className="text">
                    {game.summary}
                </p>

                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {game.comments
                            ? game.comments.map(c =>
                                <li className="comment">
                                    <p>{c} </p>
                                </li>
                            )
                            : <p className="no-comment">No comments.</p>
                        }
                    </ul>
                </div>

                {/* Edit/Delete buttons ( Only for creator of this game )  */}
                <div className="buttons">
                    <Link to={`/${gameId}/edit`} className="button">
                        Edit
                    </Link>
                    <Link to={`/${gameId}/delete`} className="button">
                        Delete
                    </Link>
                </div>
            </div>
            {/* Bonus */}
            {/* Add Comment ( Only for logged-in users, which is not creators of the current game ) */}
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={addCommentHandler}>
                    <input
                        type="text"
                        name='username'
                        placeholder='John Doe'
                        onChange={onChange}
                        onBlur={validateUsername}
                        value={comment.username}
                    />

                    {err.username &&
                        <div style={{ color: 'red' }}> {err.username}</div>}

                    <textarea
                        name="comment"
                        placeholder="Comment......"
                        onChange={onChange}
                        value={comment.comment}
                    />
                    <input
                        className="btn submit"
                        type="submit"
                        value="Add Comment"
                    />
                </form>
            </article>
        </section>
    );
}