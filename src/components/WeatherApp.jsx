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
        console.log(response.data);
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
      console.log(hour);
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
    <div className='justify-center items-center py-20 bg-gray-800'>
      <div className="flex justify-center">
        <input type="search" required placeholder="Enter Your City" value={city} onChange={e => setCity(e.target.value)}
          className="text-black border border-gray-300 rounded-lg py-2 px-4 w-64 md:w-80 focus:outline-none"
          onKeyDown={(e) => { if (e.key === "Enter") searchWeather(); }}/>
        <button className="right-0 top-0 bottom-0 rounded-lg border border-gray-700 flex items-center justify-center w-12 bg-gray-700 ml-1">
          <FontAwesomeIcon icon={faSearch} onClick={searchWeather} className="text-gray-400" />
        </button>
      </div>
      <div className="flex justify-center">
        <div className="w-3/5 bg-blue-400 p-20 rounded-2xl m-6 items-center">
          <h1 className="text-center mb-4 font-bold">{data.name}</h1>
          <div className="flex items-center justify-evenly mx-10">
            <div className="w-1/2">
                <h2 className='mb-2'>{data.weather ? selectCondition() : null}</h2>
                <p className='font-bold ml-10'>{data.weather ? <p>{description}</p> : null}</p>
            </div>
            <h1 className="w-1/2 text-right font-bold">{data.main ? <p>{data.main.temp.toFixed()}°F</p> : null}</h1>
          </div>
          <div className="items-left p-3 ml-10">
            <h1 className='font-bold'>{Time}</h1>
            <p className='font-bold'>{getTodaysDate(new Date())}</p>
          </div>
        </div>
      </div>
    </div>
  )
}