import { Game } from './GameTemplate/Game';

export const Home = ({games}) => {
    return (
        <section id="welcome-world">
            <div className="welcome-message">
                <h2>ALL new games are</h2>
                <h3>Only in GamesPlay</h3>
            </div>
            <img src="./images/four_slider_img01.png" alt="hero" />
            <div id="home-page">
                <h1>Latest Games</h1>
                {games.length > 0
                    ? games.map(g => <Game key={g._id} game={g} />)

                    : <p className="no-articles">No games yet</p>
                }
            </div>
        </section>
    );
}