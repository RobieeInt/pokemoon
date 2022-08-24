import React from "react";

const InfoPokemon = ({ data }) => {
    console.log(data)
    return (
        <>
            {
                (!data || !localStorage.getItem("catchPokemon")) ? (<>
                    <h1>Catch Ur First Pokemon</h1>
                </>     ) : (
                    <>
                    <h1>{data.name}</h1>
            <img className="info-pokemon-img" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`} alt="" />
                <h2>Owns</h2>
                <div className="owns">
                    {/* get own pokemon from local storage */}
                           
                    {
                    JSON.parse(localStorage.getItem("catchPokemon")).map((item, i) => {
                        return (
                            <>
                                {item && item.pokemonData.name === data.name ?
                                <div className="group">
                                        <h3>{item.Own}</h3>
                                </div>
                               :  ""}
                            </>
                                )
                            }
                        )
                    }
                </div>
            <div className="divider"></div>
                        <h2>TYPES</h2>
                    <div className="types">
                {
                    data.types.map((item, i) => {
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
                    data.moves.sort((a, b) => {
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