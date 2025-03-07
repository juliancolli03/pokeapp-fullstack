const axios = require('axios');
const FavoritePokemon = require('../models/FavoritePokemon');
const dotenv = require('dotenv');

dotenv.config();
const POKE_API_URL = process.env.POKE_API_URL;

const fetchAllPokemon = async () => {
  try {

    const firstResponse = await axios.get(POKE_API_URL);
    const { count, results: firstResults } = firstResponse.data;
    const pageSize = firstResults.length;
    const totalPages = Math.ceil(count / pageSize);


    if (totalPages === 1) return firstResults;

    const requests = [];
    for (let i = 1; i < totalPages; i++) {
      const offset = i * pageSize;
      requests.push(axios.get(`${POKE_API_URL}?offset=${offset}&limit=${pageSize}`));
    }

    const responses = await Promise.all(requests);
    let allPokemon = firstResults;
    responses.forEach(response => {
      allPokemon = allPokemon.concat(response.data.results);
    });

    return allPokemon;
  } catch (error) {
    console.error("Error al obtener la lista de Pokémon:", error);
    throw new Error("No se pudo recuperar la lista de Pokémon.");
  }
};




exports.searchPokemon = async (req, res) => {
  try {
    const { query, page = 1, limit = 10 } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'Se requiere un término de búsqueda' });
    }

    const allPokemon = await fetchAllPokemon(); 

    const filteredPokemon = allPokemon.filter(pokemon =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );

    const startIndex = (page - 1) * limit;
    const paginatedResults = filteredPokemon.slice(startIndex, startIndex + Number(limit));

    res.json({
      total: filteredPokemon.length,
      page: Number(page),
      limit: Number(limit),
      results: paginatedResults,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener Pokémon' });
  }
};

exports.getPokemonDetails = async (req, res) => {
  try {
    const { name } = req.params;
    if (!name) {
      return res.status(400).json({ message: 'Se requiere el nombre del Pokémon' });
    }

    const response = await axios.get(`${POKE_API_URL}/${name}`);
    const pokemonData = response.data;

    const details = {
      name: pokemonData.name,
      id: pokemonData.id,
      height: pokemonData.height,
      weight: pokemonData.weight,
      types: pokemonData.types.map((t) => t.type.name),
      abilities: pokemonData.abilities.map((a) => a.ability.name),
      sprites: pokemonData.sprites.front_default,
    };

    res.json(details);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener detalles del Pokémon' });
  }
};

exports.addFavorite = async (req, res) => {
  try {
    const { pokemonName } = req.body;
    if (!pokemonName) {
      return res.status(400).json({ message: 'El nombre del Pokémon es requerido' });
    }

    const existingFavorite = await FavoritePokemon.findOne({ userId: req.user.id, pokemonName });
    if (existingFavorite) {
      return res.status(400).json({ message: 'El Pokémon ya está en favoritos' });
    }

    const favorite = new FavoritePokemon({ userId: req.user.id, pokemonName });
    await favorite.save();

    res.json({ message: 'Pokémon agregado a favoritos' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar Pokémon a favoritos' });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const favorites = await FavoritePokemon.find({ userId: req.user.id }).select('pokemonName');
    res.json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener favoritos' });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const { pokemonName } = req.body;
    if (!pokemonName) {
      return res.status(400).json({ message: 'El nombre del Pokémon es requerido' });
    }

    const deletedFavorite = await FavoritePokemon.findOneAndDelete({
      userId: req.user.id,
      pokemonName,
    });
    if (!deletedFavorite) {
      return res.status(404).json({ message: 'El Pokémon no estaba en favoritos' });
    }

    res.json({ message: 'Pokémon eliminado de favoritos' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el Pokémon de favoritos' });
  }
};
