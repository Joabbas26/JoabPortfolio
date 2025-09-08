import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStop, faPlay, faShuffle, faSearch } from '@fortawesome/free-solid-svg-icons';

export default function PokedexApp() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonDescription, setPokemonDescription] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  // Keep a ref to the current utterance so we can cancel it
  const utteranceRef = useRef(null);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getTypeColor = (type) => {
    const typeColors = {
      normal: 'gray',
      fire: 'red',
      water: 'blue',
      electric: 'goldenrod',
      grass: 'green',
      ice: 'steelblue',
      fighting: 'orange',
      poison: 'purple',
      ground: 'saddlebrown',
      flying: 'teal',
      psychic: 'magenta',
      bug: 'olive',
      rock: 'brown',
      ghost: 'darkviolet',
      dragon: 'darkorange',
      dark: 'dimgray',
      steel: 'darkgray',
      fairy: 'fuchsia',
    };
    return typeColors[type] || 'black';
  };

  const searchPokemon = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      );
      const data = response.data;
      setPokemonData(data);

      const speciesResponse = await axios.get(data.species.url);
      const speciesData = speciesResponse.data;

      const description = speciesData.flavor_text_entries.find(
        (entry) => entry.language.name === 'en'
      );

      const sanitizedDescription = description.flavor_text
        .replace(/[^a-zA-Z0-9 .éÉ]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase()
        .replace(/(?:^|[.!?]\s+)\w/g, (c) => c.toUpperCase());

      setPokemonDescription(sanitizedDescription);
    } catch (error) {
      console.error(error);
      setPokemonData(null);
      setPokemonDescription('');
    }
  };

  const fetchRandomPokemon = async () => {
    try {
      const randomId = Math.floor(Math.random() * 898) + 1; // There are currently 898 Pokémon
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      const pokemonData = response.data;

      const speciesResponse = await axios.get(pokemonData.species.url);
      const speciesData = speciesResponse.data;
      const description = speciesData.flavor_text_entries.find(
        (entry) => entry.language.name === 'en'
      );

      const sanitizedDescription = description.flavor_text
        .replace(/[^a-zA-Z0-9 .éÉ]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase()
        .replace(/(?:^|[.!?]\s+)\w/g, (c) => c.toUpperCase());

      setPokemonData(pokemonData);
      setPokemonDescription(sanitizedDescription);
      setPokemonName('');
    } catch (error) {
      console.error('Error fetching random Pokémon:', error);
    }
  };

  // ---- Web Speech API (Option A) ----
  // Preload voices on some browsers (voices load async)
  useEffect(() => {
    // Trigger loading of voices
    window.speechSynthesis.getVoices();
    const handle = () => {
      // no-op: just ensures voices are loaded; you could store them if you want
    };
    window.speechSynthesis.addEventListener('voiceschanged', handle);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', handle);
      window.speechSynthesis.cancel(); // stop any ongoing speech on unmount
    };
  }, []);

  const pickEnglishVoice = () => {
    const voices = window.speechSynthesis.getVoices() || [];
    // Prefer a local English voice if available
    return (
      voices.find((v) => v.lang?.toLowerCase().startsWith('en') && v.localService) ||
      voices.find((v) => v.lang?.toLowerCase().startsWith('en')) ||
      null
    );
  };

  const handlePlay = () => {
    if (!pokemonDescription) return;

    // Stop anything already speaking
    window.speechSynthesis.cancel();

    const u = new SpeechSynthesisUtterance(pokemonDescription);
    const voice = pickEnglishVoice();
    if (voice) u.voice = voice;

    // Optional tuning
    u.rate = 1;   // 0.1–10
    u.pitch = 1;  // 0–2
    u.volume = 1; // 0–1

    u.onstart = () => setIsPlaying(true);
    u.onend = () => setIsPlaying(false);
    u.onerror = () => setIsPlaying(false);

    utteranceRef.current = u;
    window.speechSynthesis.speak(u);
  };

  const handlePause = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    utteranceRef.current = null;
  };
  // ---- End Web Speech API ----

  return (
    <div className="justify-center items-center py-20 bg-gray-800 grow h-screen">
      <div className="flex items-center justify-center mb-5">
        <input
          className="border border-gray-400 p-2 mr-2 text-gray-800 rounded-lg bg-white"
          type="text"
          value={pokemonName}
          onChange={(e) =>
            setPokemonName(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))
          }
          placeholder="Enter Pokémon name"
          onKeyDown={(e) => e.key === 'Enter' && searchPokemon(e)}
        />
        <button
          className="bg-gray-700 border border-gray-700 text-white px-4 py-2 rounded"
          onClick={searchPokemon}
        >
          <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
        </button>
      </div>

      {pokemonData && (
        <div className="flex justify-center items-center my-12 mx-4">
          <div className="grid grid-cols-3 grid-rows-3 w-96 h-auto bg-red-900 shadow-inner shadow-red-800 border border-black rounded-xl">
            <div className="row-start-1 col-start-1 col-span-2 mx-4 flex justify-start items-start">
              <div className="w-36 h-36 my-5 bg-gray-800 rounded-full">
                {pokemonData.sprites && (
                  <img
                    src={pokemonData.sprites.front_default}
                    alt={pokemonData.name}
                    className="w-36 h-36 stroke-2"
                  />
                )}
              </div>
            </div>

            {/* Top-right controls / labels */}
            <div className="row-start-1 col-start-3 flex flex-col justify-between">
              <div className="mx-3 pt-4 flex flex-col justify-end">
                <div className="flex grow justify-end items-center w-full">
                  <div className="w-4/5 h-1/3 rounded-full bg-blue-600 mx-1 sm:h-1/2 md:w-4 md:h-3"></div>
                  <div className="w-4/5 h-1/3 rounded-full bg-yellow-300 mx-1 sm:h-1/2 md:w-4 md:h-3"></div>
                  <div className="w-4/5 h-1/3 rounded-full bg-green-600 mx-1 sm:h-1/2 md:w-4 md:h-3"></div>
                  <div className="w-36 h-5 rounded-full bg-black mx-1 sm:h-7 md:w-10 md:h-8"></div>
                </div>
                <div className="flex justify-end">
                  <p className="text-xl font-bold text-white md:text-3xl">
                    {capitalizeFirstLetter(pokemonData.name)}
                  </p>
                </div>
                <div className="flex justify-end">
                  <h2 className="font-semibold text-white">#{pokemonData.id}</h2>
                </div>
                <div className="flex justify-end">
                  {pokemonData.types && pokemonData.types.length > 0 && (
                    <div className="flex justify-end">
                      {pokemonData.types.map((type, index) => (
                        <div
                          className="inline-block rounded-full mx-1 shadow-lg"
                          key={index}
                          style={{ background: getTypeColor(type.type.name) }}
                        >
                          <span className="text-xxs p-1 antialiased font-semibold text-white flex items-center ">
                            {type.type.name.toUpperCase()}
                            {index < pokemonData.types.length - 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="row-start-2 col-start-1 col-end-4 mx-8 flex justify-center items-center h-auto">
              <p className="bg-white border border-black rounded p-4 text-gray-800">
                {pokemonDescription}
              </p>
            </div>

            {/* Bottom buttons */}
            <div className="row-start-3 col-start-1 col-end-4 flex justify-center items-center">
              <button
                className="border border-black p-5 mx-2"
                onClick={handlePlay}
                disabled={!pokemonDescription || isPlaying}
                title={!pokemonDescription ? 'No description to read' : 'Play'}
              >
                <FontAwesomeIcon icon={faPlay} />
              </button>
              <button
                className="border border-black p-5 mx-2"
                onClick={handlePause}
                disabled={!isPlaying}
                title="Stop"
              >
                <FontAwesomeIcon icon={faStop} />
              </button>
              <button className="border border-black p-5 mx-2" onClick={fetchRandomPokemon}>
                <FontAwesomeIcon icon={faShuffle} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
