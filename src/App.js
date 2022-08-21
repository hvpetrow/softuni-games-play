import './App.css';
import { lazy, Suspense } from 'react';


import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Routes, Route } from 'react-router-dom';
import { Login } from './components/Login/Login';
import { Create } from './components/Create/Create';
import { Edit } from './components/Edit/Edit';
import { Details } from './components/Details/Details';
import { Catalog } from './components/Catalog/Catalog';
import { AuthProvider } from './contexts/AuthContext';
import { GameProvider } from './contexts/GameContext';

import { Logout } from './components/Logout';

const Register = lazy(() => import('./components/Register/Register'));

function App() {
    
    return (
        <AuthProvider>
            <GameProvider>
                <div id="box">
                    <Header />
                    <main id="main-content">
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/register' element={
                                <Suspense fallback={<span>Loading...</span>}>
                                    <Register />
                                </Suspense>} />
                            <Route path='/create' element={<Create />} />
                            <Route path='/:gameId/edit' element={<Edit />} />
                            <Route path='/details' element={<Details />} />
                            <Route path='/catalog' element={<Catalog />} />
                            <Route path='/details/:gameId' element={<Details />} />
                            <Route path='/logout' element={<Logout />} />
                        </Routes>
                    </main>
                </div>
            </GameProvider>
        </AuthProvider>


    );
}

export default App;

