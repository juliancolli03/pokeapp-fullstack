import { useState, useEffect } from 'react';
import useAxios from './useAxios';

const useSearchPokemons = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [pokemonList, setPokemonList] = useState([]);
  
  const axiosInstance = useAxios();

  useEffect(() => {
    if (!query) {
      setPokemonList([]);
      setTotal(0);
      return;
    }

    const fetchPokemons = async () => {
      try {
        const response = await axiosInstance.get('/api/pokemon/search', {
          params: { query, page, limit }
        });
        const data = response.data;
        setPokemonList(data.results || []);
        setTotal(data.total || 0);
      } catch (error) {
        console.error('Error al buscar Pokémon:', error);
      }
    };

    fetchPokemons();
  }, [query, page, limit, axiosInstance]);

  return {
    query,
    setQuery,
    page,
    setPage,
    limit,
    total,
    pokemonList,
  };
};

export default useSearchPokemons;
