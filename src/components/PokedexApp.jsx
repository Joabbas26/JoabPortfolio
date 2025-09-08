import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStop, faPlay, faShuffle, faSearch } from '@fortawesome/free-solid-svg-icons';

export default function PokedexApp() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonDescription, setPokemonDescription] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  // ---- Typeahead state ----
  const [allPokemon, setAllPokemon] = useState([]);        // ["bulbasaur", ...]
  const [suggestions, setSuggestions] = useState([]);      // filtered list
  const [activeIndex, setActiveIndex] = useState(-1);      // keyboard highlight
  const inputWrapRef = useRef(null);

  // ---- Standard voice (auto-picked) ----
  const [ttsVoice, setTtsVoice] = useState(null);
  const utteranceRef = useRef(null);

  const pickStandardVoice = (voices) => {
    if (!voices || !voices.length) return null;
    const prefs = [
      /microsoft david/i, /microsoft mark/i,
      /google uk english male/i, /google us english/i,
      /victoria/i, /alex/i, /samantha/i
    ];
    for (const re of prefs) {
      const v = voices.find(v => re.test(v.name));
      if (v) return v;
    }
    return voices.find(v => /^en/i.test(v.lang)) || voices.find(v => v.default) || voices[0] || null;
  };

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const loadVoices = () => {
      const list = window.speechSynthesis.getVoices();
      const chosen = pickStandardVoice(list);
      setTtsVoice(chosen);
    };
    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      window.speechSynthesis.cancel();
    };
  }, []);

  // Fetch all Pokémon names once for suggestions
  useEffect(() => {
    const loadAll = async () => {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
        const json = await res.json();
        const names = (json.results || []).map(x => x.name); // lowercase from API
        setAllPokemon(names);
      } catch (e) {
        console.error('Failed to load Pokémon list for suggestions:', e);
      }
    };
    loadAll();
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const onDocClick = (e) => {
      if (!inputWrapRef.current) return;
      if (!inputWrapRef.current.contains(e.target)) {
        setSuggestions([]);
        setActiveIndex(-1);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const getTypeColor = (type) => {
    const typeColors = {
      normal: 'gray', fire: 'red', water: 'blue', electric: 'goldenrod',
      grass: 'green', ice: 'steelblue', fighting: 'orange', poison: 'purple',
      ground: 'saddlebrown', flying: 'teal', psychic: 'magenta', bug: 'olive',
      rock: 'brown', ghost: 'darkviolet', dragon: 'darkorange', dark: 'dimgray',
      steel: 'darkgray', fairy: 'fuchsia',
    };
    return typeColors[type] || 'black';
  };

  // Filter suggestions as the user types
  const updateSuggestions = (rawValue) => {
    const q = rawValue.trim().toLowerCase();
    if (!q) {
      setSuggestions([]);
      setActiveIndex(-1);
      return;
    }
    // prefix-first, then substring matches; limit to 8
    const starts = allPokemon.filter(n => n.startsWith(q));
    const contains = allPokemon.filter(n => !n.startsWith(q) && n.includes(q));
    const merged = [...starts, ...contains].slice(0, 8);
    setSuggestions(merged);
    setActiveIndex(merged.length ? 0 : -1);
  };

  const searchPokemon = async (nameOverride) => {
    try {
      const name = (nameOverride ?? pokemonName).toLowerCase();
      if (!name) return;

      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
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
      // Hide suggestions after a successful search
      setSuggestions([]);
      setActiveIndex(-1);
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
      setSuggestions([]);
      setActiveIndex(-1);
    } catch (error) {
      console.error('Error fetching random Pokémon:', error);
    }
  };

  // ---- Web Speech API Play/Stop using the standard voice ----
  const handlePlay = () => {
    if (!pokemonDescription || typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const u = new SpeechSynthesisUtterance(pokemonDescription);
    if (ttsVoice) {
      u.voice = ttsVoice;
      u.lang = ttsVoice.lang;
    }
    u.rate = 1.08;
    u.pitch = 0.85;
    u.volume = 1;

    u.onstart = () => setIsPlaying(true);
    u.onend = () => setIsPlaying(false);
    u.onerror = () => setIsPlaying(false);

    utteranceRef.current = u;
    window.speechSynthesis.speak(u);
  };

  const handlePause = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    utteranceRef.current = null;
  };
  // ---- End Web Speech API ----

  // Select a suggestion (click or Enter)
  const selectSuggestion = (name) => {
    const cased = capitalizeFirstLetter(name);
    setPokemonName(cased);
    searchPokemon(name); // search immediately
  };

  // Input handlers
  const onInputChange = (e) => {
    const raw = e.target.value;
    // Keep your display capitalization while typing
    const display = raw.charAt(0).toUpperCase() + raw.slice(1);
    setPokemonName(display);
    updateSuggestions(raw);
  };

  const onInputKeyDown = (e) => {
    if (!suggestions.length) {
      if (e.key === 'Enter') {
        e.preventDefault();
        searchPokemon();
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const name = suggestions[activeIndex] ?? suggestions[0];
      if (name) selectSuggestion(name);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setSuggestions([]);
      setActiveIndex(-1);
    }
  };

  return (
    <div className="justify-center items-center py-20 bg-gray-800 grow h-screen">
      <div className="flex items-center justify-center mb-5" ref={inputWrapRef}>
  <div className="flex items-stretch gap-2">
    {/* Input + suggestions (relative wrapper so dropdown matches input width) */}
    <div className="relative">
      <input
        className="h-10 w-72 border border-gray-400 px-3 text-gray-800 rounded-lg bg-white"
        type="text"
        value={pokemonName}
        onChange={onInputChange}
        placeholder="Enter Pokémon name"
        onKeyDown={onInputKeyDown}
        autoComplete="off"
      />

      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute z-20 mt-1 w-full max-h-64 overflow-auto bg-white border border-gray-300 rounded-lg shadow">
          {suggestions.map((name, idx) => {
            const display = capitalizeFirstLetter(name);
            const isActive = idx === activeIndex;
            return (
              <li
                key={name}
                className={`px-3 py-2 cursor-pointer text-black ${
                  isActive ? 'bg-gray-200' : 'hover:bg-gray-100'
                }`}
                onMouseEnter={() => setActiveIndex(idx)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => selectSuggestion(name)}
              >
                {display}
              </li>
            );
          })}
        </ul>
      )}
    </div>

    {/* Search button — same height as input */}
    <button
      className="h-10 px-3 bg-white border border-gray-300 text-gray-700 rounded-lg flex items-center justify-center"
      onClick={() => searchPokemon()}
      aria-label="Search"
      title="Search"
    >
      <FontAwesomeIcon icon={faSearch} className="leading-none" />
    </button>
  </div>
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
