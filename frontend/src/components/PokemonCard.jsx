import React from 'react';
import { Link } from 'react-router-dom';

const PokemonCard = ({
  pokemon,
  isFavorite = false,
  onRemove,
  onAdd,
  showDetails = false
}) => {

  const { id, name, sprites, height, weight, types, abilities } = pokemon || {};

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column align-items-center justify-content-center">
        <h5 className="card-title text-capitalize">{name}</h5>
        {sprites && (
          <img 
            src={sprites.front_default || sprites} 
            alt={name} 
            className="img-fluid mb-2" 
            style={{ maxHeight: '100px' }}
          />
        )}
        {id && <p><strong>ID:</strong> {id}</p>}
        {height && <p><strong>Altura:</strong> {height / 10} m</p>}
        {weight && <p><strong>Peso:</strong> {weight / 10} kg</p>}
        {types && types.length > 0 && (
          <p>
            <strong>Tipos:</strong> {types.join(', ')}
          </p>
        )}
        {abilities && abilities.length > 0 && (
          <p>
            <strong>Habilidades:</strong> {abilities.join(', ')}
          </p>
        )}

        {showDetails && (
          <Link to={`/pokemon/${name}`} className="btn btn-info btn-sm me-2">
            Ver Detalles
          </Link>
        )}

        {onAdd && onRemove ? (
          isFavorite ? (
            <button
              onClick={() => onRemove(name)}
              className="btn btn-danger btn-sm mt-2"
            >
              Quitar
            </button>
          ) : (
            <button
              onClick={() => onAdd(name)}
              className="btn btn-warning btn-sm mt-2"
            >
              Agregar
            </button>
          )
        ) : onRemove ? (
          <button
            onClick={() => onRemove(name)}
            className="btn btn-danger btn-sm mt-2"
          >
            Quitar
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default PokemonCard;
