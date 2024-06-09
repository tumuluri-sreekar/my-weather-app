import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState([]);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`http://localhost:3999/weather?city=${city}`); 
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();  
    fetchWeatherData();
  };

  return (
    <div className="app">
      <h1 className="title">Weather App</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter City : 
          <input className='input' type="text" value={city} onChange={handleCityChange} />
        </label>
        <br/><br/>
        <button className="button" type="submit">Get Weather</button>
      </form>
      {weatherData.length > 0 ? (
        <div>
          <h3 className="subtitle">Weather in {city}</h3>
          <p>Current time: {weatherData[0].time}</p>
          <p>Current Temperature: {weatherData[0].temperature}°C</p>
          <p>Current humidity: {weatherData[0].humidity}%</p>
          <p>Current windspeed: {weatherData[0].windspeed}</p>
          <p>Description: {weatherData[0].description}</p>
          <h3 className="subtitle">Temperature Forecast in {city} for the next 5 days</h3>
          <ul>
            {weatherData.map((item) => (
              <li key={item.time}>
                {item.time}: {item.temperature}°C
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No weather data available</p>
      )}
    </div>
  );
}

export default App;