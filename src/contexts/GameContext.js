import { createContext, useEffect, useState } from "react";
import * as gameService from '../services/gameService';

export const GameContext = createContext();

export const GameProvider = ({children}) => {
    const [games, setGames] = useState([]);
   
    const useGetAllGames =() =>{
        useEffect(() => {
            gameService.getAll()
                .then(result => { setGames(result) });
        }, []);
    }

    const editGameHandler = (editedGame) => {
        setGames(games => {
            return [
                ...games.map(g => g._id !== editedGame._id ? g : editedGame)
            ]
        });
    }


    const addComment = (gameId, comment) => {
        setGames(state => {
            const game = state.find(g => g._id === gameId);

            const comments = game.comments || [];
            comments.push(comment);

            return [
                ...state.filter(x => x._id !== gameId),
                { ...game, comments }
            ]
        })
    }

    const addGameHandler = (gameData) => {
        setGames(state => [
            ...state,
            gameData
        ]);
    }

    return (
        <GameContext.Provider value={{ addGameHandler, editGameHandler,addComment,useGetAllGames,setGames,games }}>
            {children}
        </GameContext.Provider>
    );
}