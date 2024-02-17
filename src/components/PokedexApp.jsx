import React, { useState } from 'react';
import axios from 'axios';

export default function PokedexApp() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonEntry, setPokemonEntry] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setPokemonName(event.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault()
    setLoading(true);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
      .then((response) => {
        setPokemonData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setPokemonData(null);
        setLoading(false);
      });
      
      // Api for pokedex entries
    axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName.toLowerCase()}`)
      .then((response) => {
        setPokemonEntry(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setPokemonEntry(null);
        setLoading(false);
      })
  };

  return (
    <div className='container'>
      <div className="pokedexTitle"><h1>Pokédex</h1></div>
      <div className="searchDiv">
      <input
        className="pokedexInput"
        type="text"
        value={pokemonName}
        onChange={handleInputChange}
        placeholder="Enter Pokémon name"
        onKeyDown={e => e.key === 'Enter' && handleSearch(e)}
      />
      <button className="pokedexSearchButton" onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
      </div>
      <div className="container" id='pokedexData'>
      {pokemonData && (
        <div>
          <h2>{pokemonData.name[0].toUpperCase() + pokemonData.name.substring(1)}</h2>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          <h3>Types:</h3>
          <ul>
            {pokemonData.types.map((type) => (
              <p key={type.slot}>{type.type.name}</p>
            ))}
          </ul>
          <h3>{pokemonData.id}</h3>
          <p>{pokemonEntry.flavor_text_entries}</p>
        </div>
      )}
      </div>
    </div>
  );
};