import React from 'react';
import './Card.css'

const Card = ({pokemon, handleClick}) => {
   
    return (
        <div className="card-container">
            <img 
                src={`https://img.pokemondb.net/sprites/home/normal/${pokemon}.png`} 
                alt="pokemon" 
                id={pokemon}  
                onClick={handleClick} 
                key={pokemon}
            />
        </div>
    )
}

export default Card;


