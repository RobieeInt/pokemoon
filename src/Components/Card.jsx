
import React, { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
    
    
const Card = ({ pokemon, loading, infoPokemon}) => {
   // console.log(pokemon);
    //button catch to local storage
    const [catchPokemon, setCatchPokemon] = useLocalStorage("catchPokemon", []);
    useEffect(() => {
        // console.log(catchPokemon);
    } ,[catchPokemon])
    return (
        <>
        {
            loading ? <h1>Loading...</h1> :
                pokemon.map((item, i) => {
                    //count pokemon in local storage
                    const count = catchPokemon.filter(pokemon => pokemon.name === item.name).length;
                    return (
                        <>
                            <div className="group" key={i}>
                                <div className="card" onClick={() => infoPokemon(item)}>
                                    <h3>{item.name}</h3>
                                <img src={item.sprites.front_default} alt="" />
                                    <button className="btn-catch" onClick={() => {
                                        // windows prompt giving name to pokemon
                                        const Own = window.prompt("Enter your Pokemon name");
                                        // concat namePokemon to catchPokemon
                                        setCatchPokemon([...catchPokemon, {Own: Own, pokemonData: item}]);
                                    infoPokemon(item);
                                }
                                }>Catch</button>
                                <h3>{count}</h3>
                                </div>
                            </div>
                        </>
                    )
                }
                )
        }

        </>
    )
}
export default Card;