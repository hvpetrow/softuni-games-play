import './App.css';
import { useEffect, useState } from 'react';

import * as gameService from './services/service';

import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Routes,Route } from 'react-router-dom';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Create } from './components/Create/Create';
import { Edit } from './components/Edit/Edit';
import { Details } from './components/Details/Details';
import { Catalog } from './components/Catalog/Catalog';



function App() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        gameService.getAll()
            .then(result => setGames(result));
    }, []);

    const addComment = (gameId,comment) => {
        setGames(state => {
            const game = state.find(g=> g._id === gameId);

            const comments = game.comments || [];
            comments.push(comment);

            return [
                ...state.filter(x => x._id !== gameId),
                {...game,comments}
            ]
        })
    }

    const addGameHandler = (gameData) => {
        setGames(state => [
            ...state,
            gameData
        ])
    }

    return (
        <div id="box">
            <Header />
            <main id="main-content">
                <Routes>
                    <Route path='/' element={<Home games={games} />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/create' element={<Create addGameHandler={addGameHandler} />} />
                    <Route path='/edit' element={<Edit />} />
                    <Route path='/details' element={<Details />} />
                    <Route path='/catalog' element={<Catalog games={games} />} />
                    <Route path='/details/:gameId' element={<Details games={games} addComment= {addComment} />} />
                </Routes>
            </main>
        </div>

    );
}

export default App;
