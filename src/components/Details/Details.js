import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { GameContext } from '../../contexts/GameContext';
import { create, getByGameId } from '../../services/commentService';
import * as gameService from "../../services/gameService";


export const Details = () => {
    const { setGames, games, addComment } = useContext(GameContext);
    const [ currentGame, setCurrentGame ] = useState({});
    const { auth } = useContext(AuthContext);
    const { gameId } = useParams();
    const navigate = useNavigate();


    // const game = games.find(g => g._id === gameId);//game should coming from server(request)

    useEffect(() => {
        gameService.getOne(gameId)
            .then(result => {
                setCurrentGame(result) });
    }, [gameId]);
    
    const isOwner = currentGame._ownerId === auth._id;
    // const [comment, setComment] = useState({
    //     username: '',
    //     comment: ''
    // });

    // const [err, setErr] = useState({
    //     username: '',
    //     comment: ''
    // });


    const addCommentHandler = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const comment = formData.get('comment');

        create(gameId, comment)
            .then(result => {
                console.log(result);
                addComment(gameId, comment);
            })

        // addComment(gameId, `${comment.username}: ${comment.comment}`);
    };


    // const onChange = (e) => {
    //     setComment(state => ({
    //         ...state,
    //         [e.target.name]: e.target.value
    //     }))
    // }

    // const validateUsername = (e) => {
    //     const username = e.target.value;
    //     let errorMessage = '';

    //     if (username.length < 4) {
    //         errorMessage = 'Username must be longer than 4 characters';
    //     } else if (username.length > 10) {
    //         errorMessage = 'Username must be shorter than 10 characters';
    //     }

    //     setErr(state => ({
    //         ...state,
    //         username: errorMessage
    //     }));
    // }

    const gameDeleteHandler = () => {
        const confirmation = window.confirm('Are you sure you want to delete this game?');

        if (confirmation) {
            gameService.remove(gameId)
                .then(() => {
                    navigate('/catalog');
                })
        }
    }

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src={currentGame.imageUrl} alt="game-img" />
                    <h1>{currentGame.title}</h1>
                    <span className="levels">MaxLevel: {currentGame.maxLevel}</span>
                    <p className="type">{currentGame.category}</p>
                </div>
                <p className="text">
                    {currentGame.summary}
                </p>

                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {currentGame.comments
                            ? currentGame.comments.map(c =>
                                <li key={c._id} className="comment">
                                    <p>{c} </p>
                                </li>
                            )
                            : <p className="no-comment">No comments.</p>
                        }
                    </ul>
                </div>

                {/* Edit/Delete buttons ( Only for creator of this game )  */}
                {isOwner &&
                    <div className="buttons">
                        <Link to={`/${gameId}/edit`} className="button">
                            Edit
                        </Link>
                        <button onClick={gameDeleteHandler} className="button">
                            Delete
                        </button>
                    </div>
                }
            </div>
            {/* Bonus */}
            {/* Add Comment ( Only for logged-in users, which is not creators of the current game ) */}
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={addCommentHandler}>
                    {/* <input
                        type="text"
                        name='username'
                        placeholder='John Doe'
                        onChange={onChange}
                        onBlur={validateUsername}
                        value={comment.username}
                    /> */}

                    {/* // {err.username && */}
                    {/* //     <div style={{ color: 'red' }}> {err.username}</div>} */}

                    <textarea
                        name="comment"
                        placeholder="Comment......"
                    // onChange={onChange}
                    // value={comment.comment}
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