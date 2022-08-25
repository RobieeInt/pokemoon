import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
      <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <h3>CATCH Ur POKEMON</h3>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                                    <Link className='btn-navbar' to="/">Landfield</Link>
                                    <Link className='btn-navbar' to="/mypokemon">My Pokeball</Link>
                    </div>
                </div>
            </nav>
      </>
  )
}

export default Navbar