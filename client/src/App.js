import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city) {
      alert("Please enter a city!");
      return;
    }

    try {
      console.log(`Fetching weather for: ${city}`); // Debugging log

      const response = await fetch(`http://localhost:5000/weather?city=${city}`);

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();

      if (!data || !data.location || !data.current) {
        throw new Error("Invalid API response");
      }

      console.log("Weather Data:", data); // Debugging log
      setWeather(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching weather:", error);
      setError("Failed to fetch weather data.");
      setWeather(null);
    }
  };

  return (
    <div className="app-container">
      <h1>Todays Forecast</h1>
      <p>Enter a city to check the weather:</p>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="search-input"
      />
      <button onClick={fetchWeather} className="search-button">
        Get Weather
      </button>

      {error && <p className="error">{error}</p>}

      {weather && weather.location && weather.current && (
        <div className="weather-container">
          <h2>{weather.location.name}, {weather.location.country}</h2>
          <p>{weather.current.condition.text}</p>
          <p>Temperature: {weather.current.temp_c}°C / {weather.current.temp_f}°F</p>
          <p>Humidity: {weather.current.humidity}%</p>
          <p>Wind: {weather.current.wind_kph} km/h ({weather.current.wind_mph} mph)</p>
          <img src={weather.current.condition.icon} alt={weather.current.condition.text} />
        </div>
      )}
    </div>
  );
};

export default App;
