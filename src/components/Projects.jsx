import Pokedex from '../assets/Pokedex.png'
import { Link } from 'react-router-dom';
import snakeEaters from '../assets/snakeEaters.png';
import employeeTable from '../assets/EmployeeRanking.png';
import weatherApp from '../assets/WeatherApp.png';
import PokedexImg from '../assets/Pokedex.png';
// import PaycheckCalculator from './Images/PaycheckCalculator.png';


export default function Projects() {

  const projects = [
    {
      id: 1,
      title: 'CRUD App',
      description: 'Open a modal and add data to a table. Perform calculation based on data. Able to delete rows and edit data. CRUD project using JavaScript, React and Redux Toolkit to handle state management',
      imageUrl: employeeTable,
      githubLink: 'https://github.com/Joabbas26/Rank-Table',
      demoLink: '/mainTable'
    },
    {
      id: 2,
      title: 'Pokedex',
      description: 'Pokdex using the Pokemon API to find information on pokemon',
      imageUrl: PokedexImg,
      githubLink: 'https://github.com/Joabbas26/Rank-Table',
      demoLink: '/pokedex'
    },
    {
      id: 3,
      title: 'Weather App',
      description: 'Make an api call to get local weather data and show in a detailed view while being UI friendly. Used Axios and React to fetch weather data from OpenWeatherMap API.',
      imageUrl: weatherApp,
      githubLink: 'https://github.com/Joabbas26/WeatherApp',
      demoLink: '/weather'
    }
  ];

  return (
    <>
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">My Projects</h1>
        <div className="grid grid-cols-1 xs-grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-4 flex justify-center">
                <img src={project.imageUrl} alt={project.title} className="rounded-md" />
              </div>
                <h2 className="text-xl text-gray-700 font-bold mb-2">{project.title}</h2>
                <p className="text-gray-700 mb-4">{project.description}</p>
              <div className="flex justify-center">
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="bg-gray-800 text-white font-bold py-2 px-4 rounded-md mr-4 hover:bg-gray-700">GitHub</a>
                <Link to={project.demoLink} target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600">Live Demo</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}