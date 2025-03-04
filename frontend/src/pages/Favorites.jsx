import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useAxios from '../hooks/useAxios'

const Favorites = () => {
  const [favorites, setFavorites] = useState([])
  const axiosInstance = useAxios()

  useEffect(() => {
    fetchFavorites()
  }, [])

  const fetchFavorites = async () => {
    try {
      const response = await axiosInstance.get('/api/pokemon/favorites')
      setFavorites(response.data)
    } catch (error) {
      console.error('Error al obtener favoritos', error)
    }
  }

  const removeFromFavorites = async (pokemonName) => {
    try {
      await axiosInstance.delete('/api/pokemon/favorite', {
        data: { pokemonName },
      })
      setFavorites((prev) => prev.filter((pokemon) => pokemon.pokemonName !== pokemonName))
    } catch (error) {
      console.error('Error al eliminar de favoritos', error)
    }
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Pokémon Favoritos</h2>
      <div className="row">
        {favorites.length === 0 ? (
          <p className="text-center text-muted">No tienes Pokémon favoritos.</p>
        ) : (
          favorites.map((pokemon, index) => (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-3" key={index}>
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                  <h5 className="card-title text-capitalize">{pokemon.pokemonName}</h5>
                  <button
                    onClick={() => removeFromFavorites(pokemon.pokemonName)}
                    className="btn btn-danger mt-2"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="text-center mt-4">
        <Link to="/" className="btn btn-warning">
          Volver
        </Link>
      </div>
    </div>
  )
}

export default Favorites
