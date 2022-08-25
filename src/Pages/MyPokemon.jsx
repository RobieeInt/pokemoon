import React from "react"

import MyCollection from "../Components/MyCollection"

const MyPokemon = () => {
  return (
      <div>
          <MyCollection />
          {/* //button delete all pokemon and refresh page */}
          <button className="btn-delete" onClick={() => {
              localStorage.removeItem("catchPokemon");
              window.location.reload();
          }
            }>Delete All</button>
          
    </div>
  )
}

export default MyPokemon
