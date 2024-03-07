import {useState} from 'react';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCloud, faCloudRain, faSun, faMoon, faCloudSun, faBoltLightning, faWind, faSnowflake, faCloudShowersHeavy } from '@fortawesome/free-solid-svg-icons';

export default function WeatherApp() {

const [city, setCity] = useState('');
const [data, setData] = useState({});

  const getTodaysDate = (d) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
      ];
 
    const days = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ];
 
    // Fetches the day of the week
    var day = days[d.getDay()]; 
    // Fetches the date i.e. 1st - 31st day of the month
    var date = d.getDate(); 
    // Fetches the month
    var month = months[d.getMonth()]; 
    // Fetches the year
    var year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  }

  var Time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });
  var description = '';

 

  // api key and base url
  const api = {
    key: "3fabe9fdca16afb5e55e69008aee39d3",
    base: "https://api.openweathermap.org/data/2.5/"
  }

  // Get weather from api
  async function searchWeather () {
    // Get weather from api
      await axios.get(`${api.base}weather?q=${city}&units=imperial&appid=${api.key}`)
      .then((response) => {
        setData(response.data);
      })
      .catch(error => console.log(error))
      setCity('');
  }

  var hour = data.timezone;

  const selectCondition = () => {
    const condition = [
      'Clouds',
      'Fog',
      'Mist',
      'Rain',
      'Heavy Rain',
      'Wind',
      'Partly Cloudy',
      'Sun',
      'Clear',
      'Snow',
      'Thunder',
      'Night'
    ];

    const iconCondition = [
      faCloud,
      faCloud,
      faCloud,
      faCloudRain,
      faCloudShowersHeavy,
      faWind,
      faCloudSun,
      faSun,
      faSun,
      faSnowflake,
      faBoltLightning,
      faMoon
    ];

    const betterCondition = [
      'Cloudy',
      'Fog',
      'Mist',
      'Raining',
      'Heavy Rain',
      'Windy',
      'Partly Cloudy',
      'Sunny',
      'Sunny',
      'Snowing',
      'Lightning',
      'Night'
    ]

    for(var i = 0; i < condition.length; i++){
      if(parseInt(hour) >= 19){
        description = 'Night';
        return <FontAwesomeIcon icon={faMoon} size='10x'/>
      }
      else if(data.weather[0].main === condition[i]){  
        description = betterCondition[i];
        return <FontAwesomeIcon icon={iconCondition[i]} size='10x'/>
      }
    }
  }

  return (
    <div className='justify-center items-center py-20 bg-gray-800 grow h-screen md:hfull'>
      <div className="flex justify-center mx-10">
        <input type="search" required placeholder="Enter Your City" value={city} onChange={e => setCity(e.target.value)}
          className="text-black border border-gray-300 rounded-lg py-2 px-4 w-64 md:w-80 focus:outline-none"
          onKeyDown={(e) => { if (e.key === "Enter") searchWeather(); 
          }}/>
        <button className="right-0 top-0 bottom-0 rounded-lg border border-gray-700 flex items-center justify-center w-12 bg-gray-700 ml-1">
          <FontAwesomeIcon icon={faSearch} onClick={searchWeather} className="text-gray-400" />
        </button>
      </div>
      <div className="flex justify-center">
        <div className="w-10/12 bg-blue-400 p-4 rounded-2xl my-6 items-center md:p-20 lg:w-3/5">
          <p className="text-center mb-4 font-bold text-4xl">{data.name}</p>
          <div className="flex flex-col items-center justify-evenly lg:mx-10 md:flex-row">
            <div className="md:w-1/2">
                <p className='mb-2 text-xxs md:text-lg'>{data.weather ? selectCondition() : null}</p>
                <div className='flex font-bold justify-center md:justify-start md:ml-10'>{data.weather ? <p>{description}</p> : null}</div>
            </div>
            <div className="font-bold md:w-1/2 md:text-right">{data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}</div>
          </div>
          <div className="p-3 mt-4 lg:ml-10">
            <p className='font-bold text-4xl'>{Time}</p>
            <p className='font-bold'>{getTodaysDate(new Date())}</p>
          </div>
        </div>
      </div>
    </div>
  )
}