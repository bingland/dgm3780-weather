import { useState, useEffect } from 'react'
import EntryArea from './components/EntryArea/EntryArea'
import { getHourMin, getMonthDay, getHour } from './utils/timeConverters'
import { getCountryName } from './utils/convertCountry'
import './App.scss';

function App() {

  const [location, setLocation] = useState('Orem')
  const [units, setUnits] = useState('imperial')
  const [lon, setLon] = useState(null)
  const [lat, setLat] = useState(null)
  const [currentWeatherData, setCurrentWeatherData] = useState({})
  const [dailyForecastData, setDailyForecastData] = useState({})
  const [hourlyForecastData, setHourlyForecastData] = useState({})

  //loading state
  const [resultsReady, setResultsReady] = useState(false)

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

        // set long and lat to null so second api call doesn't trigger prematurely 
        setLon(null)
        setLat(null)
        setResultsReady(false)

        return res.json()
      } else {
        throw new Error('Invalid query')
        // TODO: tell user that their query is invalid
      }
    })
    .then(data => {
      console.log(data)
      // set lon and lat of location once the currentweather is received. this enables the use of oneCallUrl.
      setLon(data.coord.lon)
      setLat(data.coord.lat)
      setCurrentWeatherData({
        name: data.name,
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        wind_speed: data.wind.speed,
        wind_deg: data.wind.deg,
        country: getCountryName(data.sys.country),
        sunrise: getHourMin(data.sys.sunrise),
        sunset: getHourMin(data.sys.sunset),
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  const getOneCall = () => {
    if (!lon || !lat) 
      return -1
    
    fetch(`${oneCallUrl}&lon=${lon}&lat=${lat}&units=${units}`)
    .then(res => {
      if(res.ok) {
        console.log('Valid query')
        return res.json()
      } else {
        throw new Error('Invalid query')
        // TODO: tell user that their query is invalid
      }
    })
    .then(data => {
      console.log(data)
      setDailyForecastData(data.daily.map(item => {
        return {
          high: item.temp.max,
          low: item.temp.min,
          wind_speed: item.wind_speed,
          wind_deg: item.wind_deg,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          day: getMonthDay(item.dt)
        }
      }))
      setHourlyForecastData(data.hourly.map(item => {
        return {
          temp: item.temp,
          wind_speed: item.wind_speed,
          wind_deg: item.wind_deg,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          hour: getHour(item.dt)
        }
      }))
      setResultsReady(true)
    })
    .catch(error => {
      console.log(error)
    })
  }

  // functions for DOM events

  useEffect(getCurrentWeather, [])

  useEffect(() => {
    if (lon && lat) {
      getOneCall()
    }
  }, [lon, lat])

  return (
    <div className="App">
      <EntryArea 
        location={location} 
        units={units} 
        setLocation={setLocation} 
        setUnits={setUnits}
        getCurrentWeather={getCurrentWeather}
      />
      { resultsReady && (
        <div className="resultsArea">
          <p>{currentWeatherData.name}</p>
          <p>{dailyForecastData[0].day}</p>
          <p>{hourlyForecastData[0].hour}</p>
        </div>
      )}
    </div>
  );
}

export default App;
