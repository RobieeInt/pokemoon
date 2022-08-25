import React, { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";

const InfoPokemon = () => {
   
    // get pokemon by id from url
    const id = window.location.pathname.split("/")[2];
    // console.log(id);

    //get pokemon data from api
    const [pokemon, setPokemon] = useState();
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
    // console.log(OwnPokemon);

    //store randomvalue
    const [randomValueget, setRandomValue] = useState();

    //random set value with 50 percent
    const randomValue = () => {
        const random = Math.floor(Math.random() * 100) + 1;
        setRandomValue(random);
    }

    useEffect(() => {
        randomValue();
    }
        , [])
    
    // console.log(randomValueget);

    
    return (
        <>
            {
                (!pokemon) ? <h1>Loading...</h1> :(
                    <>
                        <h1>{pokemon.name}</h1>
                        <img className="info-pokemon-img" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`} alt="" />
                        <h2><button className="btn-catch" onClick={() => {
                            //check random value with 50 percent
                            if (randomValueget > 50) {

                                //giving name to pokemon
                                const Own = window.prompt("congrats u catch this pokemon, Enter your Pokemon name");
                                //store data to local storage
                                // setCatchPokemon([...catchPokemon, { Own: Own, pokemonData: pokemon }]);
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
                                

                            } else {
                                alert("You didnt catch this pokemon");
                            }
                            // windows prompt giving name to pokemon and must be unique in local storage
                            // const Own = window.prompt("Enter your Pokemon name");
                            //Map Own pokemon from local storage
                            // const Own = window.prompt("Enter your Pokemon name");
                            //push new pokemon to local storage
                                // concat namePokemon to catchPokemon name pokemon must be unique
                            
                            //reload page every time when catch pokemon so it will show new random value
                            window.location.reload();
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