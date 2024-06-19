import React, { useState } from "react";
import Weather from './Weather.jsx';


const API_KEY = "";

const Home = () => {
  const [placeName, setPlace] = useState("");
  const [weather, setWeather] = useState('');

  function handleInput(event) {
    setPlace(event.target.value);
  }

  const getWeather = async (event) => {
    event.preventDefault();
    
    const url1 = `http://api.openweathermap.org/geo/1.0/direct?q=${placeName}&limit=5&appid=${API_KEY}`;

    try {
      const response = await fetch(url1);
      const result = await response.json();
      const lat = result[0].lat;
      const lon = result[0].lon;

      const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

      const wea = await fetch(url2);
      const res = await wea.json();
      setWeather(res);
      console.log(res);
    } catch (error) {
      console.log("error fetching api", error);
    }
  }

  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const showPosition = async (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude, longitude, "geo");
    // You can reverse geocode the latitude and longitude to get the place name here
    // setPlace(placeName);
  };

  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.");
        break;
    }
  };

  return (
    <div className="home-container">
      <h1>Check Weather!</h1>
      
      <button className="location-button" onClick={useCurrentLocation}>
        Use Current Location
      </button>
  
      <input
        className="location-input"
        placeholder="Enter location"
        name="location"
        type="string"
        value={placeName}
        onChange={handleInput}
      />
      <button className="check-button" onClick={getWeather}>
        CHECK
      </button>

      {weather && (
        <div className="weather-display">
          <Weather data={weather} />
        </div>
      )}
    </div>
  );
};

export default Home;
