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


    const [modal, setModal] = useState(false);
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
                            if (randomValueget > 50) {
                                
                                toggleModal2();
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
                                 toggleModal();
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
            <div className="divider"></div>
                <h2>Moves</h2>
                    <div className="moves">
                {
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
                                        <img className="info-pokemon-img" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`} alt="" />
                                        <p>
                                            Nice Catch Bro !
                                        </p>
                                        <input type="text" placeholder="Enter your Pokemon name" onChange={(e) => {
                                            setPokemonName(e.target.value);
                                        }
                                        } />
                                        <button className="save-modal" onClick={() => {
                                            setCatchPokemon([...catchPokemon, { Own: pokemonName, pokemonData: pokemon }]);
                                            window.location.reload();
                                            pokemonName('');
                                        }
                                        }>
                                            SAVE
                                        </button>
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