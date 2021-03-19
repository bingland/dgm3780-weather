import { useState, useEffect } from 'react'
import './App.scss';

function App() {

  const [location, setLocation] = useState('Orem')
  const [units, setUnits] = useState('imperial')
  const [lon, setLon] = useState(null)
  const [lat, setLat] = useState(null)
  const [currentWeatherData, setCurrentWeatherData] = useState({})
  const [dailyForecastData, setDailyForecastData] = useState({})
  const [hourlyForecastData, setHourlyForecastData] = useState({})


  // accesses current weather data. requires q (query) and app id. 
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.REACT_APP_API_KEY}`
  // get daily and hourly forcest by using One Call API; requires lat, lon, and appid. Returns current weather, minute forecast, hourly, daily, alerts, history
  const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?appid=${process.env.REACT_APP_API_KEY}`

  // functions for API calls
  const getCurrentWeather = () => {
    fetch(`${currentWeatherUrl}&q=${location}&units=${units}`)
    .then(res => {
      if(res.ok) {
        console.log('Valid query')
        return res.json()
      } else {
        throw "invalid response"
        // TODO: tell user that their query is invalid
      }
    })
    .then(data => {
      console.log(data)
      // set lon and lat of location once the currentweather is received. this enables the use of oneCallUrl.
      setLon(data.coord.lon)
      setLat(data.coord.lat)
      setCurrentWeatherData({
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        wind_speed: data.wind.speed,
        wind_deg: data.wind.deg,
        country: data.sys.country,
        sunrise: timeConverter(data.sys.sunrise),
        sunset: timeConverter(data.sys.sunset),
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  // convert unix time into english
  const timeConverter = (UNIX_timestamp) => {
    let a = new Date(UNIX_timestamp * 1000);
    //let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    //let year = a.getFullYear();
    //let month = months[a.getMonth()];
    //let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    // modify these values to adjust to what you need
    let time = hour + ':' + min ;
    return time;
  }

  useEffect(getCurrentWeather, [])

  useEffect(() => {
    console.log(currentWeatherData)
  },[currentWeatherData])

  return (
    <div className="App">
      <p>{currentWeatherUrl}</p>
      <p>{oneCallUrl}</p>
    </div>
  );
}

export default App;
