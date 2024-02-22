import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStop, faPlay, faShuffle, faSearch } from '@fortawesome/free-solid-svg-icons';

export default function PokedexApp() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pokemonDescription, setPokemonDescription] = useState("");


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
      setPokemonDescription(description.flavor_text);
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
          onChange={(e) => setPokemonName(e.target.value)}
          placeholder="Enter Pokémon name"
          onKeyDown={e => e.key === 'Enter' && searchPokemon(e)}
        />
        <button className="bg-gray-700 border border-gray-700 text-white px-4 py-2 rounded" onClick={searchPokemon} disabled={loading}>
        <FontAwesomeIcon icon={faSearch} onClick={searchPokemon} className="text-gray-400" />
        </button>
      </div>


    {pokemonData && (
    <div className="flex justify-center items-center my-12">
      <div className="grid grid-cols-3 grid-rows-3 w-96 h-auto bg-red-900 border border-black rounded-xl">
        {/* Dark blue circle on the top left corner */}
        <div className="row-start-1 col-start-1 m-1 flex justify-center items-center">
          <div className="w-40 h-20 m-5 bg-gray-800 rounded-full">
          {pokemonData.sprites && (
        <img
            src={pokemonData.sprites.front_default}
            alt={pokemonData.name}
            className="w-48 h-24"
          /> )}
          </div>
        </div>
        
        {/* Div on the top right corner with 4 rows */}
        <div className="row-start-1 col-start-3 flex flex-col justify-between">
          <div className=" p-4 flex flex-col justify-end">
            <div className="flex justify-end items-center w-full">
            <div className="w-12 h-3 rounded-full bg-blue-600 mx-1"></div>
            <div className="w-12 h-3 rounded-full bg-yellow-300 mx-1"></div>
            <div className="w-12 h-3 rounded-full bg-green-600 mx-1"></div>
            <div className="w-36 h-8 rounded-full bg-black mx-1"></div>
          </div>
          <div className="flex justify-end">
            <h2 className="text-2xl font-bold">{pokemonData.name}</h2>
          </div>
          <div className="flex justify-end">
            <h2>#{pokemonData.id}</h2>
          </div>
          <div className='flex justify-end'>
            {pokemonData.types && pokemonData.types.length > 0 && (
            <p className="text-lg font-semibold mb-2">
            {pokemonData.types.map((type) => type.type.name).join(", ")}
            </p>
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
          <button className="border border-black p-6 mx-2">
            <FontAwesomeIcon icon={faStop} />
          </button>
          <button className="border border-black p-6 mx-2">
            <FontAwesomeIcon icon={faPlay} />
          </button>
          <button className="border border-black p-6 mx-2" onClick={fetchRandomPokemon}>
            <FontAwesomeIcon icon={faShuffle} />
          </button>
        </div>
      </div>
    </div>
     )}
 </div>
);};