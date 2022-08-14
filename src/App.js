import { useEffect, useState } from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';

function App() {

    return (
        <div id="box">
            <Header />

            <main id="main-content">
                <Home />

            </main>

        </div>

    );
}

export default App;
