
import React, { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";
import { Link } from 'react-router-dom';
    
    
const Card = ({ pokemon, loading, infoPokemon}) => {
   // console.log(pokemon);
    //button catch to local storage
    const [catchPokemon, setCatchPokemon] = useLocalStorage("catchPokemon", []);
    useEffect(() => {
        // console.log(catchPokemon);
    }, [catchPokemon])
    
    

    return (
        <>
            {
            loading ? <h1>Loading...</h1> :
                pokemon.map((data, i) => {
                    return (
                        <>
                            <div className="group" key={i}>
                                <Link to={`/detail/${data.id}`} onClick={() => infoPokemon(data)}>
                                    
                                <div className="card" onClick={() => infoPokemon(data)}>
                                        <h3>{data.name}</h3>
                                        
                                <img src={data.sprites.front_default} alt="" />
                                </div>
                                </Link>
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