const mongoose = require('mongoose');

const FavoritePokemonSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    pokemonName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FavoritePokemon', FavoritePokemonSchema);
