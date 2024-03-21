import { Link } from 'react-router-dom';
import table from '../assets/CRUDApp.png';
import weather from '../assets/Weather.png';
import pokedex from '../assets/Pokedex.png';
import payCheck from '../assets/Paycheck.png';

export default function Projects() {

  const projects = [
    {
      id: 1,
      title: 'CRUD App',
      description: 'CRUD application using JavaScript, React, and Redux Toolkit, that enables users to efficiently manage data, perform calculations, and manipulate records within a dynamic user interface through modal data entry, dynamic table display, and advanced calculation capabilities.',
      imageUrl: table,
      githubLink: 'https://github.com/Joabbas26/Rank-Table',
      demoLink: '/table'
    },
    {
      id: 2,
      title: 'Weather App',
      description: 'User-friendly weather application using JavaScript, React, and Axios, that fetches and presents detailed local weather data from the OpenWeatherMap API with an intuitive interface and comprehensive weather display.',
      imageUrl: weather,
      githubLink: 'https://github.com/Joabbas26/WeatherApp',
      demoLink: '/weather'
    },
    {
      id: 3,
      title: 'Paycheck App',
      description: 'Pay Check calculator using JavaScript, React, and Axios, that calculates how much you make per second depending on your hourly wage.',
      imageUrl: payCheck,
      githubLink: 'https://github.com/Joabbas26/WeatherApp',
      demoLink: '/paycheck'
    },
    {
      id: 4,
      title: 'Pokedex',
      description: 'Pokédex application utilizing JavaScript, React, and Axios, that seamlessly retrieves and displays comprehensive information on Pokémon from the official Pokémon API while providing real-time data updates.',
      imageUrl: pokedex,
      githubLink: 'https://github.com/Joabbas26/Rank-Table',
      demoLink: '/pokedex'
    }
    
  ];

  return (
    <div className='bg-gray-800 py-20 grow w-full flex justify-center scroll-smooth'>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">My Projects</h1>
        <div className="grid grid-cols-1 xs-grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project.id} className="bg-gray-700 rounded-lg shadow-md p-6">
              <div className="mb-4 flex justify-center">
                <img src={project.imageUrl} alt={project.title} className="rounded-md" />
              </div>
                <h2 className="text-xl text-white font-bold mb-2">{project.title}</h2>
                <p className="text-white mb-4">{project.description}</p>
              <div className="flex justify-center">
              <Link to={project.githubLink} target="_blank" rel="noopener noreferrer" className="bg-gray-800 text-white font-bold py-2 px-4 border rounded-md mr-4 hover:bg-gray-800 hover:text-white hover:border-gray-800">GitHub</Link>
              <Link to={project.demoLink} rel="noopener noreferrer" className="bg-blue-500 text-white font-bold py-2 px-4 border rounded-md hover:bg-blue-500 hover:text-white hover:border-blue-800">Live Demo</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}