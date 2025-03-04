import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import useSearchPokemons from '../hooks/useSearchPokemons';
import useFavorites from '../hooks/useFavorites';
import Pagination from '../components/Pagination';
import PokemonCard from '../components/PokemonCard';

const Home = () => {
  const { token } = useContext(AuthContext);

  const {
    query,
    setQuery,
    page,
    setPage,
    limit,
    total,
    pokemonList
  } = useSearchPokemons();

  const { favorites, addToFavorites, removeFromFavorites } = useFavorites(token);

  return (
    <div className="mt-4">
      <h2 className="text-center mb-4">Buscar Pokémon</h2>

      <div className="row mb-4 justify-content-center">
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Ingresa el nombre del Pokémon"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>
      </div>

      <div className="row">
        {pokemonList.length === 0 ? (
          <p className="text-center text-muted">No se encontraron resultados.</p>
        ) : (
          pokemonList.map((pokemon, index) => {
            const isFavorite = token && favorites.some((fav) => fav.pokemonName === pokemon.name);
            return (
              <div className="col-sm-6 col-md-4 col-lg-3 mb-3" key={index}>
                <PokemonCard
                  pokemon={pokemon}
                  isFavorite={isFavorite}
                  onRemove={token ? removeFromFavorites : undefined}
                  onAdd={token ? addToFavorites : undefined}
                  showDetails={true}
                />
              </div>
            );
          })
        )}
      </div>

      <Pagination
        page={page}
        total={total}
        limit={limit}
        onPageChange={setPage}
      />
    </div>
  );
};

export default Home;
