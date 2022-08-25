import React, { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";
import Navbar from "./Navbar";

const InfoPokemon = () => {
   
    // get pokemon by id from url
    const id = window.location.pathname.split("/")[2];
    // console.log(id);

   

    //set PokemonName
    const [pokemonName, setPokemonName] = useState();

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


    //making modal
    const [modal, setModal] = useState(false);
    //modal2
    const [modal2, setModal2] = useState(false);

    const toggleModal2 = () => {
        setModal2(!modal2);
    }

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
    }
    
    console.log(OwnPokemon);
    
    return (
        <>
            {
                (!pokemon) ? <h1>Loading...</h1> :(
                    <>
                        <Navbar />
                        <h1>{pokemon.name}</h1>
                        <img className="info-pokemon-img" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`} alt="" />
                        <h2><button className="btn-catch" onClick={toggleModal}>Modal</button></h2>
                        <h2><button className="btn-catch" onClick={() => {
                            //check random value with 50 percent
                            if (randomValueget > 50) {
                                
                                toggleModal2();
                                //giving name to pokemon
                                // const Own = window.prompt("congrats u catch this pokemon, Enter your Pokemon name");
                                //store data to local storage
                                // setCatchPokemon([...catchPokemon, { Own: Own, pokemonData: pokemon }]);
                                if (pokemonName.length < 1) {
                                    return alert("Please enter a name");
                                } else if (pokemonName.length === '') {
                                    return alert("Name must be at least 3 characters");
                                } else if (pokemonName.length === null) {
                                    return alert("Name must be at least 3 characters");
                                } else if (pokemonName.length === undefined) {
                                    return alert("Name must be at least 3 characters");
                                } else if (OwnPokemon.some(p => p.Own === pokemonName)) {
                                    return alert("Name already exist");
                                    //reload page
                                } else {
                                    setCatchPokemon([...catchPokemon, { Own: pokemonName, pokemonData: pokemon }]);
                                    window.location.reload();
                                }
                                

                            } else {
                                // alert("Dang! you missed this pokemon");
                                 toggleModal();
                            }
                            // windows prompt giving name to pokemon and must be unique in local storage
                            // const Own = window.prompt("Enter your Pokemon name");
                            //Map Own pokemon from local storage
                            // const Own = window.prompt("Enter your Pokemon name");
                            //push new pokemon to local storage
                                // concat namePokemon to catchPokemon name pokemon must be unique
                            
                            //reload page every time when catch pokemon so it will show new random value
                            // window.location.reload();
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
                        
                        {/* modal */}
                        {
                            modal && (
                                <div className="modal">
                                <div onClick={toggleModal} className="overlay"></div>
                                <div className="modal-content">
                                    <h2>You Fail to Catch This pokemon</h2>
                                    <p>
                                    Sorry , Maybe Luck Next Time
                                    </p>
                                        <button className="close-modal" onClick={() => {
                                            window.location.reload();
                                            pokemonName('');
                                        }
                                        } >
                                        CLOSE
                                        </button>
                                        
                                </div>
                                </div>
                            )
                        }

                        {
                            modal2 && (
                                <div className="modal">
                                <div onClick={toggleModal2} className="overlay"></div>
                                <div className="modal-content">
                                        <h2>Yeeay {pokemon.name} !!!</h2>
                                        {/* img pokemon */}
                                        <img className="info-pokemon-img" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`} alt="" />
                                        <p>
                                            Nice Catch Bro !
                                        </p>
                                        {/* //input name pokemon */}
                                        <input type="text" placeholder="Enter your Pokemon name" onChange={(e) => {
                                            setPokemonName(e.target.value);
                                        }
                                        } />

                    
                                        {/* //input name pokemon with handleInputValidation */}
                                        {/* <input type="text" placeholder="Enter your Pokemon name" onChange={handleInputvalidation} /> */}
                                        
                                        {/* //save button */}
                                        <button className="save-modal" onClick={() => {
                                            //save name to local storage
                                            setCatchPokemon([...catchPokemon, { Own: pokemonName, pokemonData: pokemon }]);
                                            //relaod page and setpokemon name to null
                                            window.location.reload();
                                            pokemonName('');
                                        }
                                        }>
                                            SAVE
                                        </button>
                                        {/* button close and reload page */}
                                        <button className="close-modal" onClick={() => {
                                            window.location.reload();
                                            pokemonName('');
                                        }
                                        } >
                                        CLOSE
                                        </button>
                                        
                                </div>
                                </div>
                            )
                        }
                    </>
                )

                
                        
            }
            
            
        </>
    );
}

export default InfoPokemon;