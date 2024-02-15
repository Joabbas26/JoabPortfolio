import Pokedex from '../assets/Pokedex.png'
import { Link } from 'react-router-dom';
import snakeEaters from '../assets/snakeEaters.png';
import employeeTable from '../assets/EmployeeRanking.png';
import weatherApp from '../assets/WeatherApp.png';
import PokedexImg from '../assets/Pokedex.png';
// import PaycheckCalculator from './Images/PaycheckCalculator.png';


export default function Projects() {
  return (
    <div className='projectsDiv'>
      <p className='projectsTitle'>Projects</p>
      {/* Web projects */}
      <p className='projectTitle' id='webDevSection'>Full Stack</p>
      <div className='container' id='projectsSection'>  
        {/* New Project format  */}
        <div className='row' id='projectRow'>
          <div className='col-md-9'>
              <div className="projectCard">
                <h5 className="projectCardTitle">Rank Table</h5>
                <img className='img-fluid' src={employeeTable} alt="projectImage"/>  
              </div>
            </div>
            <div className='col-md-3' id='projectInfoDiv'>
              <div className='projectInfo'>
                <p className="projectDescription">Open a modal and add data to a table. Perform calculation based on data. Able to delete rows and edit data.
                  CRUD project using JavaScript, React and Redux Toolkit to handle state management</p>
                  <div className='projectInfoButtons'>
                    <a className='btn btn-primary' href="https://github.com/Joabbas26/Rank-Table">Github</a>
                    <button className='btn btn-danger'><Link to="/mainTable" style={{ color: 'inherit', textDecoration: 'inherit'}}>Demo</Link></button>
                  </div>
              </div>
            </div>
        </div>
        <div className='row' id='projectRow'>
          <div className='col-md-3' id='projectInfoDiv'>
              <div className='projectInfo'>
                <p className="projectDescription">Make an api call to get local weather data and show in a detailed view while being UI friendly. 
            Used Axios and React to fetch weather data from OpenWeatherMap API.</p>
                  <div className='projectInfoButtons'>
                    <a className='btn btn-primary' href="https://github.com/Joabbas26/WeatherApp">Github</a>
                    <button className='btn btn-danger'><Link to="/weather" style={{ color: 'inherit', textDecoration: 'inherit'}}>Demo</Link></button>
                  </div>
              </div>
            </div>
            <div className='col-md-9'>
              <div className="projectCard">
                <h5 className="projectCardTitle">Weather API</h5>
                <img className='img-fluid' src={weatherApp} alt="projectImage"/>  
              </div>
            </div>         
        </div>  
        {/* New Project format  */}
        <div className='row' id='projectRow'>
          <div className='col-md-9'>
              <div className="projectCard">
                <h5 className="projectCardTitle">Pokedex</h5>
                <img className='img-fluid' src={PokedexImg} alt="projectImage"/>  
              </div>
            </div>
            <div className='col-md-3' id='projectInfoDiv'>
              <div className='projectInfo'>
                <p className="projectDescription">Pokdex for searching pokemon</p>
                  <div className='projectInfoButtons'>
                    <a className='btn btn-primary' href="https://github.com/Joabbas26/Rank-Table">Github</a>
                    <button className='btn btn-danger'><Link to="/Pokedex" style={{ color: 'inherit', textDecoration: 'inherit'}}>Demo</Link></button>
                  </div>
              </div>
            </div>
        </div> 
      </div>
    </div>
  )
}