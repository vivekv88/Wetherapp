import React, { useEffect, useRef, useState } from 'react'
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

  const inputRef = useRef()
  const [weatherData,setWeatherData] = useState(false);

  const API_KEY = import.meta.env.VITE_APP_ID;

  const search = async (city) => {
    try {
      const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`);
      const data = await response.json();
      console.log(data);
      setWeatherData({
        humidity: data.current?.humidity,
        windSpeed: data.current?.wind_kph,
        temperature: data.current?.temp_c,
        location: data.location.name,
        air_quality_co: data.current.air_quality.co,
        air_quality_no2: data.current.air_quality.no2,
        air_quality_o3: data.current.air_quality.o3,
        air_quality_so2: data.current.air_quality.so2,
      })

    } catch (error) {
      
    }
  }

  useEffect(()=>{
    search("Mumbai");
  },[])

  return (
    <div className='weather'>
      <div className="search-box">
        <input ref={inputRef} type="text" placeholder='Enter the City...' />
        <img src={searchIcon} alt="" onClick={()=>search(inputRef.current.value)}/>
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

      <div className="weather-data">
        <div className="air-quality-index">
          <p>Air Quality Index:-</p>
          <div className="gases">
            <p>CO: {weatherData.air_quality_co}</p>
            <p>NO2: {weatherData.air_quality_no2}</p>
            <p>SO2: {weatherData.air_quality_so2}</p>
            <p>O3: {weatherData.air_quality_o3}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather
