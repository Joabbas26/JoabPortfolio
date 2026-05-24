import { Link } from 'react-router-dom';
import table from '../assets/CRUDApp.png';
import weather from '../assets/Weather.png';
import pokedex from '../assets/Pokedex.png';
import payCheck from '../assets/Paycheck.png';
import tracklore from '../assets/TrackLore.jpeg';

export default function Projects() {

  const projects = [
    {
      id: 1,
      category: 'data',
      title: 'Python Data Analysis',
      description: 'Exploratory data analysis using Python, Pandas, NumPy, and Matplotlib/Seaborn to uncover trends and insights from real-world datasets.',
      imageUrl: 'https://placehold.co/400x200/1e3a5f/ffffff?text=Python+Data+Analysis',
      githubLink: 'https://github.com/Joabbas26',
      demoLink: null
    },
    {
      id: 2,
      category: 'data',
      title: 'Power BI Dashboard',
      description: 'Interactive business intelligence dashboard built in Power BI, visualizing key metrics and KPIs to support data-driven decision making.',
      imageUrl: 'https://placehold.co/400x200/1e3a5f/ffffff?text=Power+BI+Dashboard',
      githubLink: 'https://github.com/Joabbas26',
      demoLink: null
    },
    {
      id: 4,
      category: 'ios',
      title: 'TrackLore iOS App',
      description: 'TrackLore is an iOS application that helps you identify theme songs from your favorite TV shows, movies and anime.',
      imageUrl: tracklore,
      githubLink: 'https://apps.apple.com/us/app/tracklore/id6747784234',
      demoLink: 'https://apps.apple.com/us/app/tracklore/id6747784234'
    },
    {
      id: 5,
      category: 'ios',
      title: 'iOS App Project 2',
      description: 'Completed iOS application project placeholder. Project details, screenshots, and demo links will be added soon.',
      imageUrl: 'https://placehold.co/400x200/1f2937/ffffff?text=iOS+App+Project+2',
      githubLink: 'https://github.com/Joabbas26',
      demoLink: null
    },
    {
      id: 6,
      category: 'web',
      title: 'CRUD App',
      description: 'CRUD application using JavaScript, React, and Redux Toolkit, that enables users to efficiently manage data, perform calculations, and manipulate records within a dynamic user interface through modal data entry, dynamic table display, and advanced calculation capabilities.',
      imageUrl: table,
      githubLink: 'https://github.com/Joabbas26/CRUD-Table',
      demoLink: '/table'
    },
    {
      id: 7,
      category: 'web',
      title: 'Weather App',
      description: 'User-friendly weather application using JavaScript, React, and Axios, that fetches and presents detailed local weather data from the OpenWeatherMap API with an intuitive interface and comprehensive weather display.',
      imageUrl: weather,
      githubLink: 'https://github.com/Joabbas26/WeatherApp',
      demoLink: '/weather'
    },
    {
      id: 8,
      category: 'web',
      title: 'Paycheck App',
      description: 'Pay Check calculator using JavaScript, React, and Axios, that calculates how much you make per second depending on your hourly wage.',
      imageUrl: payCheck,
      githubLink: 'https://github.com/Joabbas26/Paycheck-App',
      demoLink: '/paycheck'
    },
    {
      id: 9,
      category: 'web',
      title: 'Pokedex',
      description: 'Pokédex application utilizing JavaScript, React, and Axios, that seamlessly retrieves and displays comprehensive information on Pokémon from the official Pokémon API while providing real-time data updates.',
      imageUrl: pokedex,
      githubLink: 'https://github.com/Joabbas26/Pokedex-App',
      demoLink: '/pokedex'
    }
  ];

  const dataProjects = projects.filter((project) => project.category === 'data');
  const iosProjects = projects.filter((project) => project.category === 'ios');
  const webProjects = projects.filter((project) => project.category === 'web');

  const renderCards = (projectList) => (
    <div className="grid grid-cols-1 xs-grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projectList.map((project) => (
        <div key={project.id} className="bg-gray-700 rounded-lg shadow-md p-6">
          <div className="mb-3 flex justify-between items-center">
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                project.category === 'data'
                  ? 'bg-blue-600 text-white'
                  : project.category === 'ios'
                    ? 'bg-slate-500 text-white'
                    : 'bg-gray-500 text-white'
              }`}
            >
              {project.category === 'data' ? 'Data Analytics' : project.category === 'ios' ? 'iOS App' : 'Web Dev'}
            </span>
            {project.demoLink === null && (
              <span className="text-xs text-yellow-400 font-semibold">Coming Soon</span>
            )}
          </div>
          <div className="mb-4 flex justify-center">
            <img src={project.imageUrl} alt={project.title} className="rounded-md" />
          </div>
          <h2 className="text-xl text-white font-bold mb-2">{project.title}</h2>
          <p className="text-white mb-4">{project.description}</p>
          <div className="flex justify-center">
            <Link to={project.githubLink} target="_blank" rel="noopener noreferrer" className="bg-gray-800 text-white font-bold py-2 px-4 border rounded-md mr-4 hover:bg-gray-800 hover:text-white hover:border-gray-800">GitHub</Link>
            {project.demoLink ? (
              <Link to={project.demoLink} rel="noopener noreferrer" className="bg-blue-500 text-white font-bold py-2 px-4 border rounded-md hover:bg-blue-600">Live Demo</Link>
            ) : (
              <button disabled className="bg-gray-600 text-gray-400 font-bold py-2 px-4 border border-gray-500 rounded-md cursor-not-allowed">Coming Soon</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className='bg-gray-800 py-20 grow w-full flex justify-center scroll-smooth'>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-10 text-center text-white">My Projects</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Data Analytics Projects</h2>
          {renderCards(dataProjects)}
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">iOS Apps</h2>
          {renderCards(iosProjects)}
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 text-white">Web Development Projects</h2>
          {renderCards(webProjects)}
        </section>
        </div>
      </div>
    
  )
}