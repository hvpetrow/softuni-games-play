import { useContext, useEffect } from "react";
import { GameContext } from "../../contexts/GameContext";
import { CatalogGameTemplate } from "./CatalogGameTemplate";
import * as gameService from '../../services/gameService';

export const Catalog = () => {
    const { games,setGames } = useContext(GameContext);
    
    useEffect(() => {
        gameService.getAll()
            .then(result => {
                console.log(games);
                 setGames(result) });
    }, []);

    return (
        <section id="catalog-page">
            <h1>All Games</h1>
            {games.length > 0
                ? games.map(g => <CatalogGameTemplate key={g._id} game={g} />)
                : <h3 className="no-articles">No articles yet</h3>
            }
        </section>
    );
}