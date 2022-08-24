import React, { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import { Link } from 'react-router-dom';

const InfoPokemon = ({ data }) => {
   
    // get pokemon by id from url
    const id = window.location.pathname.split("/")[2];
    console.log(id);

    //get pokemon data from api
    const [pokemon, setPokemon] = useLocalStorage("pokemon", []);
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await res.json();
            setPokemon(data);
        }
        fetchData();
    }, [id]);
    console.log(pokemon);

    const [catchPokemon, setCatchPokemon] = useLocalStorage("catchPokemon", []);
    useEffect(() => {
        // console.log(catchPokemon);
    }, [catchPokemon])

    const OwnPokemon = JSON.parse(localStorage.getItem("catchPokemon"));
    console.log(OwnPokemon);
    

    return (
        <>
            {
                (!pokemon) ? <h1>Loading...</h1> :(
                    <>
                        <h1>{pokemon.name}</h1>
                        <img className="info-pokemon-img" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`} alt="" />
                        <h2><button className="btn-catch" onClick={() => {
                                // windows prompt giving name to pokemon and must be unique in local storage
                            const Own = window.prompt("Enter your Pokemon name");
                            //Map Own pokemon from local storage
                            
                            //push new pokemon to local storage
                                // concat namePokemon to catchPokemon name pokemon must be unique
                            if (OwnPokemon === null) {
                                setCatchPokemon([...catchPokemon, { Own: Own, pokemonData: pokemon }]);
                                
                            } else if (OwnPokemon.some(pokemon => pokemon.Own === Own)) {
                                alert("you already named pokemon with this name");
                            } else if (Own === '') {
                                alert("Pokemon name must be filled");
                            } else if (Own === null) {
                                alert("Pokemon name must be filled");
                            } else {
                                setCatchPokemon([...catchPokemon, { Own: Own, pokemonData: pokemon }]);
                            }
                            
                            }
                            }>Catch This Pokemon</button>
                        </h2>
                    <div className="divider"></div>
                        <h2>Owns</h2>
                    <div className="types">
                        {
                            
                            OwnPokemon !== null ? OwnPokemon.map((data, i) => {
                                return (
                                    <>
                                        {
                                            data.pokemonData.id === pokemon.id ?
                                                <div className="types">
                                                    <div className="group">
                                                        <h3>{data.Own}</h3>
                                                    </div>
                                                </div>
                                                : null
                                        }
                                    </>
                                )
                            }
                            ) : null
                        }
                        </div>
                        

                    <div className="divider"></div>
                        <h2>TYPES</h2>
                    <div className="types">
                        {
                            pokemon.types.map((item, i) => {
                                return (
                                    <>
                                        <div className="group">
                                            <h3>{item.type.name}</h3>
                                        </div>
                                    </>
                                        )})
                        }
                        </div>
                        {/* divider */}
            <div className="divider"></div>
                <h2>Moves</h2>
                    <div className="moves">
                {
                  // data moves ascending
                    pokemon.moves.sort((a, b) => {
                         if (a.move.name < b.move.name) {
                                return -1;
                                    }
                                if (a.move.name > b.move.name) {
                                    return 1;
                                    }
                                return 0;
                                }
                                ).map((item, i) => {
                                return (
                                    <>
                                        <div className="group">
                                            <h3>{item.move.name}</h3>
                                        </div>
                                    </>
                            )})
                }
            </div>
            <div className="divider"></div>
                    </>
                )
            }
            
            
        </>
    );
}

export default InfoPokemon;