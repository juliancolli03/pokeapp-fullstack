const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/search', pokemonController.searchPokemon);
router.post('/favorite', authMiddleware, pokemonController.addFavorite);
router.get('/favorites', authMiddleware, pokemonController.getFavorites);
router.delete('/favorite', authMiddleware, pokemonController.removeFavorite);
router.get('/details/:name', pokemonController.getPokemonDetails);

module.exports = router;
