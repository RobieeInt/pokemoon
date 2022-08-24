import React from "react";
import InfoPokemon from "../Components/InfoPokemon";
import Card from "../Components/Card";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const Main = () => {

    // call api 1 time
    
    let pokeUrl = "https://pokeapi.co/api/v2/pokemon/";

    const [pokeData,setPokeData]=useState([]);
    const [loading,setLoading]=useState(true);
    const [url,setUrl]=useState([pokeUrl])
    const [nextUrl,setNextUrl]=useState();
    const [prevUrl,setPrevUrl]=useState();
    const [pokeDex,setPokeDex]=useState();

    const pokeFun=async()=>{
        setLoading(true)
        //call api 1 time
        const res=await axios.get(url)
        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
        getPokemon(res.data.results)
        setLoading(false)
        // console.log(res);
    }
    const getPokemon=async(res)=>{
       res.map(async(item)=>{
           const result = await axios(item.url)
        //    console.log(result.data)
          setPokeData(state=>{
              state = [...state, result.data]
            
            //   sort by name ascending
              state.sort((a, b) => {
                  if (a.name < b.name) {
                      return -1;
                  }
                  if (a.name > b.name) {
                      return 1;
                  }
                  return 0;
              }
                );
              return state;
          })
       })   
    }
    useEffect(()=>{
        pokeFun();
    }, [url])
    
    
    return (

        <div className="container">
            <div className="left-content">
                
                {/* mypokemon page */}
                    <Card pokemon={pokeData} loading={loading} infoPokemon={poke => setPokeDex(poke)}  />
                <div className="btn-group">
                    {
                        prevUrl && <button onClick={() => {
                        setPokeData([]);
                        setUrl(prevUrl)
                    }}>Prev</button>
                    }
                    {
                        nextUrl && <button onClick={() => {
                        setPokeData([]);
                        setUrl(nextUrl)
                    }}>Next</button>
                    }
                    <Link className="btn-link" to="/mypokemon"> My Pokeball</Link>
                </div>
            </div>
        </div>
    );
}
    
export default Main;