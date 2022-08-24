import React from 'react'

import InfoPokemon from "../Components/InfoPokemon";


const DetailPokemon = ({ item }) => {
  
  
  return (
            <div className="right-content">
                <InfoPokemon data={item} />
            </div>
  )
}

export default DetailPokemon