export async function getFavorites(axiosInstance) {
    const response = await axiosInstance.get('/api/pokemon/favorites');
    return response.data;
  }
  
  export async function addFavorite(axiosInstance, pokemonName) {
    const response = await axiosInstance.post('/api/pokemon/favorite', { pokemonName });
    return response.data;
  }
  
  export async function removeFavorite(axiosInstance, pokemonName) {
    const response = await axiosInstance.delete('/api/pokemon/favorite', {
      data: { pokemonName },
    });
    return response.data;
  }
  
  export async function getPokemonDetails(axiosInstance, name) {
    const response = await axiosInstance.get(`/api/pokemon/details/${name}`);
    return response.data;
  }
  