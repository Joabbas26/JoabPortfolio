import { Link } from 'react-router-dom';
import table from '../assets/CRUDApp.png';
import weather from '../assets/WeatherApp.png';
import pokedex from '../assets/Pokedex.png';

export default function Projects() {

  const projects = [
    {
      id: 1,
      title: 'CRUD App',
      description: 'Open a modal and add data to a table. Perform calculation based on data. Able to delete rows and edit data. CRUD project using JavaScript, React and Redux Toolkit to handle state management',
      imageUrl: table,
      githubLink: 'https://github.com/Joabbas26/Rank-Table',
      demoLink: '/table'
    },
    {
      id: 2,
      title: 'Pokedex',
      description: 'Pokdex using the Pokemon API to find information on pokemon',
      imageUrl: pokedex,
      githubLink: 'https://github.com/Joabbas26/Rank-Table',
      demoLink: '/pokedex'
    },
    {
      id: 3,
      title: 'Weather App',
      description: 'Make an api call to get local weather data and show in a detailed view while being UI friendly. Used Axios and React to fetch weather data from OpenWeatherMap API.',
      imageUrl: weather,
      githubLink: 'https://github.com/Joabbas26/WeatherApp',
      demoLink: '/weather'
    }
  ];

  return (
    <div className='bg-gray-800 py-20 grow w-full flex justify-center scroll-smooth'>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">My Projects</h1>
        <div className="grid grid-cols-1 xs-grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project.id} className="bg-gray-700 rounded-lg shadow-md p-6">
              <div className="mb-4 flex justify-center">
                <img src={project.imageUrl} alt={project.title} className="rounded-md" />
              </div>
                <h2 className="text-xl text-white font-bold mb-2">{project.title}</h2>
                <p className="text-white mb-4">{project.description}</p>
              <div className="flex justify-center">
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="bg-gray-800 text-white font-bold py-2 px-4 rounded-md mr-4 hover:bg-gray-700">GitHub</a>
                <Link to={project.demoLink} target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600">Live Demo</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}