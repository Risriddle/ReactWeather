import React from 'react';


const Weather = ({ data }) => {
  const { name, main, weather } = data;

  if (!main) {
    return <p>Weather data not available.</p>;
  }

  const tempCelsius = main.temp - 273.15;
  const feelsLikeCelsius = main.feels_like - 273.15;
  const weatherIconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <div className="weather-container">
      <h2>{name}</h2>
      <div className="weather-info">
        <img src={weatherIconUrl} alt={weather[0].description} />
        <div className="weather-details">
          <p>Temperature: {tempCelsius.toFixed(2)} °C</p>
          <p>Feels like: {feelsLikeCelsius.toFixed(2)} °C</p>
          <p>Weather: {weather[0].description}</p>
        </div>
      </div>
    </div>
  );
};

export default Weather;
