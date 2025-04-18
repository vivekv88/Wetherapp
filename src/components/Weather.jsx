import React, { useEffect, useState } from 'react'
import './Weather.css'
import searchIcon from '../assets/search.png'
import clearIcon from '../assets/clear.png'
import cloudIcon from '../assets/cloud.png'
import drizzleIcon from '../assets/drizzle.png'
import humidityIcon from '../assets/humidity.png'
import rainIcon from '../assets/rain.png'
import snowIcon from '../assets/snow.png'
import windIcon from '../assets/wind.png'

const Weather = () => {

  const [weatherData,setWeatherData] = useState(false);

  const search = async () => {
    try {
      const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=relative_humidity_2m,temperature_2m,wind_speed_10m,is_day&timezone=America%2FAnchorage");
      const data = await response.json();
      console.log(data);
      setWeatherData({
        humidity: data.current?.relative_humidity_2m,
        windSpeed: data.current?.wind_speed_10m,
        temperature: data.current?.temperature_2m,
        location: data.timezone
      })

    } catch (error) {
      
    }
  }

  useEffect(()=>{
    search();
  },[])

  return (
    <div className='weather'>
      <div className="search-box">
        <input type="text" placeholder='Enter the City...' />
        <img src={searchIcon} alt="" />
      </div>
      <img className='weather-icon' src={clearIcon} alt="" />
      <p className='temperature'>{weatherData.temperature}°c</p>
      <p className='location'>{weatherData.location}</p>

      <div className="weather-data">
        <div className="col">
          <img src={humidityIcon} alt="" />
          <p>{weatherData.humidity}%</p>
          <span>Humidity</span>
        </div>
        <div className="col">
          <img src={windIcon} alt="" />
          <p>{weatherData.windSpeed} Km/h</p>
          <span>Wind Speed</span>
        </div>
      </div>
    </div>
  )
}

export default Weather
