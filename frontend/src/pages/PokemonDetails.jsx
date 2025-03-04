import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import useAxios from '../hooks/useAxios'

const PokemonDetails = () => {
  const { name } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [error, setError] = useState('')
  const axiosInstance = useAxios()

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/pokemon/details/${name}`)
        setPokemon(response.data)
      } catch (err) {
        console.error('Error al obtener detalles del Pokémon', err)
        setError('No se pudieron obtener los detalles del Pokémon.')
      }
    }
    fetchPokemonDetails()
  }, [name, axiosInstance])

  if (error) {
    return <p className="text-center text-danger mt-4">{error}</p>
  }

  if (!pokemon) {
    return <p className="text-center mt-4">Cargando...</p>
  }

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow-sm">
        <div className="text-center">
          <h2 className="card-title text-uppercase">{pokemon.name} (#{pokemon.id})</h2>
          <img src={pokemon.sprites} alt={pokemon.name} className="img-fluid my-3" style={{ maxHeight: '200px' }} />
          <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
          <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
          <p><strong>Tipos:</strong> {pokemon.types.join(', ')}</p>
          <p><strong>Habilidades:</strong> {pokemon.abilities.join(', ')}</p>
          <Link to="/" className="btn btn-warning">Volver</Link>
        </div>
      </div>
    </div>
  )
}

export default PokemonDetails
