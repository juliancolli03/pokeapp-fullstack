import { useState, useEffect, useCallback } from 'react';
import useAxios from './useAxios';
import { getFavorites, addFavorite, removeFavorite } from '../services/pokemonService';

export default function useFavorites(token) {
  const axiosInstance = useAxios();
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = useCallback(async () => {
    try {
      const data = await getFavorites(axiosInstance);
      setFavorites(data);
    } catch (error) {
      console.error('Error al obtener favoritos', error);
    }
  }, [axiosInstance]);

  const addToFavorites = async (pokemonName) => {
    try {
      await addFavorite(axiosInstance, pokemonName);
      setFavorites((prev) => [...prev, { pokemonName }]);
    } catch (error) {
      console.error('Error al agregar a favoritos', error);
    }
  };

  const removeFromFavorites = async (pokemonName) => {
    try {
      await removeFavorite(axiosInstance, pokemonName);
      setFavorites((prev) => prev.filter((p) => p.pokemonName !== pokemonName));
    } catch (error) {
      console.error('Error al eliminar de favoritos', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchFavorites();
    }
  }, [token, fetchFavorites]);

  return {
    favorites,
    fetchFavorites,
    addToFavorites,
    removeFromFavorites,
  };
}
