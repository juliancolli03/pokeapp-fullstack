const request = require('supertest');
const express = require('express');
const axios = require('axios');
const FavoritePokemon = require('../models/FavoritePokemon');

// Mockear el middleware de autenticación para asignar un usuario de prueba
jest.mock('../middlewares/authMiddleware', () => {
  return (req, res, next) => {
    req.user = { id: 'test-user-id' };
    next();
  };
});

// Mockear Axios para simular las llamadas a la PokeAPI
jest.mock('axios');

// Mockear el modelo FavoritePokemon para simular las operaciones de Mongoose
jest.mock('../models/FavoritePokemon');

const app = express();
app.use(express.json());

// Importa las rutas de Pokémon (ajusta la ruta según tu estructura)
const pokemonRoutes = require('../routes/pokemonRoutes');
app.use('/api/pokemon', pokemonRoutes);

describe('Intense Pokemon API Tests', () => {
  // Pruebas para el endpoint de búsqueda
  describe('GET /api/pokemon/search', () => {
    test('debe retornar 400 si no se envía el término de búsqueda', async () => {
      const res = await request(app).get('/api/pokemon/search');
      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/se requiere un término de búsqueda/i);
    });

    test('debe retornar resultados filtrados según query, page y limit', async () => {
      // Simula respuesta de la PokeAPI
      axios.get.mockResolvedValueOnce({
        data: {
          results: [
            { name: 'pikachu' },
            { name: 'bulbasaur' },
            { name: 'charmander' },
            { name: 'squirtle' }
          ]
        }
      });

      const res = await request(app).get('/api/pokemon/search')
        .query({ query: 'pi', page: 1, limit: 2 });
      
      // Solo 'pikachu' contiene "pi"
      expect(res.status).toBe(200);
      expect(res.body.total).toBe(1);
      expect(res.body.results).toEqual([{ name: 'pikachu' }]);
    });
  });

  // Pruebas para el endpoint de detalles
  describe('GET /api/pokemon/details/:name', () => {
    test('debe retornar 400 o 404 si no se envía el nombre del Pokémon', async () => {
      const res = await request(app).get('/api/pokemon/details/');
      expect(res.status).toBe(404);
    });

    test('debe retornar los detalles de un Pokémon válido', async () => {
      const dummyData = {
        name: 'pikachu',
        id: 25,
        height: 4,
        weight: 60,
        types: [{ type: { name: 'electric' } }],
        abilities: [{ ability: { name: 'static' } }],
        sprites: { front_default: 'https://example.com/pikachu.png' }
      };

      axios.get.mockResolvedValueOnce({ data: dummyData });

      const res = await request(app).get('/api/pokemon/details/pikachu');
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('pikachu');
      expect(res.body.id).toBe(25);
      expect(res.body.types).toEqual(['electric']);
      expect(res.body.sprites).toBe('https://example.com/pikachu.png');
    });
  });

  // Pruebas para endpoints de favoritos
  describe('Favorites Endpoints', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('POST /api/pokemon/favorite - debe agregar un Pokémon a favoritos', async () => {
      // Simula que no existe aún el favorito
      FavoritePokemon.findOne.mockResolvedValueOnce(null);
      // Simula el guardado del favorito
      FavoritePokemon.prototype.save.mockResolvedValueOnce({});

      const res = await request(app)
        .post('/api/pokemon/favorite')
        .send({ pokemonName: 'pikachu' });
      
      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/agregado a favoritos/i);
    });

    test('POST /api/pokemon/favorite - debe retornar error si el Pokémon ya está en favoritos', async () => {
      // Simula que el Pokémon ya está en favoritos
      FavoritePokemon.findOne.mockResolvedValueOnce({ pokemonName: 'pikachu' });

      const res = await request(app)
        .post('/api/pokemon/favorite')
        .send({ pokemonName: 'pikachu' });
      
      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/ya está en favoritos/i);
    });

    test('GET /api/pokemon/favorites - debe retornar la lista de favoritos', async () => {
      // Simula que FavoritePokemon.find() retorna un objeto encadenable con .select()
      FavoritePokemon.find.mockImplementationOnce(() => ({
        select: jest.fn().mockResolvedValueOnce([
          { pokemonName: 'pikachu' },
          { pokemonName: 'bulbasaur' }
        ])
      }));

      const res = await request(app).get('/api/pokemon/favorites');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(2);
      expect(res.body[0]).toHaveProperty('pokemonName', 'pikachu');
    });

    test('DELETE /api/pokemon/favorite - debe eliminar un favorito', async () => {
      // Simula eliminación exitosa
      FavoritePokemon.findOneAndDelete.mockResolvedValueOnce({ pokemonName: 'pikachu' });

      const res = await request(app)
        .delete('/api/pokemon/favorite')
        .send({ pokemonName: 'pikachu' });
      
      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/eliminado de favoritos/i);
    });

    test('DELETE /api/pokemon/favorite - debe retornar 404 si el favorito no existe', async () => {
      // Simula que no se encuentra el favorito para eliminar
      FavoritePokemon.findOneAndDelete.mockResolvedValueOnce(null);

      const res = await request(app)
        .delete('/api/pokemon/favorite')
        .send({ pokemonName: 'pikachu' });
      
      expect(res.status).toBe(404);
      expect(res.body.message).toMatch(/no estaba en favoritos/i);
    });
  });
});
