import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStop, faPlay, faShuffle, faSearch } from '@fortawesome/free-solid-svg-icons';

export default function PokedexApp() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pokemonDescription, setPokemonDescription] = useState("");

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getTypeColor = (type) => {
    // Define color mappings for each type
    const typeColors = {
      normal: 'gray',
      fire: 'red',
      water: 'blue',
      electric: 'yellow',
      grass: 'green',
      ice: 'cyan',
      fighting: 'orange',
      poison: 'purple',
      ground: 'saddlebrown',
      flying: 'skyblue',
      psychic: 'magenta',
      bug: 'olive',
      rock: 'brown',
      ghost: 'darkviolet',
      dragon: 'darkorange',
      dark: 'dimgray',
      steel: 'darkgray',
      fairy: 'pink',
    };
  
    // Return the corresponding color for the type, or a default color if not found
    return typeColors[type] || 'black'; // Default to black if type not found in mapping
  };


  const searchPokemon = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      );
      const data = response.data;
      setPokemonData(data);
  
      // Fetch pokemon description
      const speciesResponse = await axios.get(data.species.url);
      const speciesData = speciesResponse.data;
      const description = speciesData.flavor_text_entries.find(
        entry => entry.language.name === 'en'
      );
      const sanitizedDescription = description.flavor_text
      .replace(/[\x00-\x1F\x7F-\x9F]+|[^a-zA-Z0-9\séÉ.]+/g, ' ') // Exclude é and É from replacement, also include periods ('.')
    .toLowerCase()  // Convert all characters to lowercase
    .replace(/(?:^|[.!?]\s+)\w/g, firstChar => firstChar.toUpperCase()); // Capitalize first letter of each word after period, exclamation mark, or question mark

      setPokemonDescription(sanitizedDescription);
    } catch (error) {
      console.error(error);
      setPokemonData(null);
      setPokemonDescription("");
    }
  };

  const fetchRandomPokemon = async () => {
    try {
      const randomId = Math.floor(Math.random() * 898) + 1; // There are currently 898 Pokémon
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      setPokemonData(response.data);
    } catch (error) {
      console.error('Error fetching random Pokémon:', error);
    }
  };

  return (
  <div className="justify-center items-center py-20 bg-gray-800 grow">
      <div className="flex items-center justify-center mb-5">
        <input
          className="border border-gray-400 p-2 mr-2 text-gray-800 rounded-lg"
          type="text"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
          placeholder="Enter Pokémon name"
          onKeyDown={e => e.key === 'Enter' && searchPokemon(e)}
        />
        <button className="bg-gray-700 border border-gray-700 text-white px-4 py-2 rounded" onClick={searchPokemon} disabled={loading}>
        <FontAwesomeIcon icon={faSearch} onClick={searchPokemon} className="text-gray-400" />
        </button>
      </div>


    {pokemonData && (
    <div className="flex justify-center items-center my-12">
      <div className="grid grid-cols-3 grid-rows-3 w-96 h-auto bg-red-900 shadow-inner shadow-red-800 border border-black rounded-xl">
        {/* Dark blue circle on the top left corner */}
        <div className="row-start-1 col-start-1 col-span-2 mx-4 flex justify-start items-start">
          <div className="w-36 h-36 my-5 bg-gray-800 rounded-full">
          {pokemonData.sprites && (
        <img
            src={pokemonData.sprites.front_default}
            alt={pokemonData.name}
            className="w-36 h-36 stroke-2"
          /> )}
          </div>
        </div>
        
        {/* Div on the top right corner with 4 rows */}
        <div className="row-start-1 col-start-3 flex flex-col justify-between">
          <div className="px-4 pt-4 flex flex-col justify-end">
            <div className="flex justify-end items-center w-full">
            <div className="w-12 h-3 rounded-full bg-blue-600 mx-1"></div>
            <div className="w-12 h-3 rounded-full bg-yellow-300 mx-1"></div>
            <div className="w-12 h-3 rounded-full bg-green-600 mx-1"></div>
            <div className="w-36 h-8 rounded-full bg-black mx-1"></div>
          </div>
          <div className="flex justify-end">
            <p className="text-3xl font-bold">{capitalizeFirstLetter(pokemonData.name)}</p>
          </div>
          <div className="flex justify-end">
            <h2 className='font-semibold'>#{pokemonData.id}</h2>
          </div>
          <div className='flex justify-end'>
            {pokemonData.types && pokemonData.types.length > 0 && (
              <div className='flex justify-end'>
                {pokemonData.types.map((type, index) => (
                  <div className='inline-block rounded-full mx-1 shadow-lg' style={{ background: getTypeColor(type.type.name)}}>
                    <span key={index}
                    className="text-xxs p-1 antialiased font-semibold text-black flex items-center ">
                    {type.type.name.toUpperCase()}
                    {index < pokemonData.types.length - 1 }
                    </span>
                  </div>
                  
                ))}
              </div>
            )}
          </div>
          </div>
        </div>
        
        {/* Big text box in the center */}
        <div className="row-start-2 col-start-1 col-end-4 mx-8 flex justify-center items-center h-auto">
          <p className="bg-white border border-black rounded p-4 text-gray-800">
            {pokemonDescription}
          </p>
        </div>
        
        {/* Row of 3 buttons on the bottom */}
        <div className="row-start-3 col-start-1 col-end-4 flex justify-center items-center">
          <button className="border border-black p-5 mx-2">
            <FontAwesomeIcon icon={faStop} />
          </button>
          <button className="border border-black p-5 mx-2">
            <FontAwesomeIcon icon={faPlay} />
          </button>
          <button className="border border-black p-5 mx-2" onClick={fetchRandomPokemon}>
            <FontAwesomeIcon icon={faShuffle} />
          </button>
        </div>
      </div>
    </div>
     )}
 </div>
);};