import { useState } from 'react';
import { useParams } from 'react-router-dom';

export const Details = ({ games,addComment }) => {
    const { gameId } = useParams();
    const [comment,setComment] = useState({
        username: '',
        comment: ''
    });

    const game = games.find(g => g._id === gameId);//game should coming from server(request)

    const addCommentHandler = (e) => {
        e.preventDefault();
        addComment(gameId,`${comment.username}: ${comment.comment}`);
    };

    const onChange = (e) => {
        setComment(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
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
                    { game.comments
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
                    <a href="#" className="button">
                        Edit
                    </a>
                    <a href="#" className="button">
                        Delete
                    </a>
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
                        value={comment.username} />
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