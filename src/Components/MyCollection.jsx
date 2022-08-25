import React, { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const MyCollection = ({ data }) => {
   
    //get data from local storage
    const [catchPokemon, setCatchPokemon] = useLocalStorage("catchPokemon", []);
    useEffect(() => {
        // console.log(catchPokemon);
    }
        , [catchPokemon])
    const OwnPokemon = JSON.parse(localStorage.getItem("catchPokemon"));
    // console.log(OwnPokemon);

    console.log(catchPokemon);

    return (
        <>
            {(!catchPokemon) ? <h1>Loading...</h1> :(
                <>
                    <Navbar />
                <h1>My Pokeball</h1>
                <div className="left-content">
                    {
                        catchPokemon.map((data, i) => {
                            return (
                                <>
                                    <div className="group" key={i}>
                                <Link to={`/detail/${data.pokemonData.id}`}> 
                                <div className="card">
                                        <h3>{data.Own}</h3>
                                            <img src={data.pokemonData.sprites.front_default} alt="" />
                                        <h3>{data.pokemonData.name}</h3>
                                </div>
                                </Link>
                            </div>
                                </>
                            )
                        }
                        )
                    }
                </div>
            </>
        )}
                    
        </>
    );
}

export default MyCollection;