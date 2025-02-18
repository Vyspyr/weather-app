import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "0acee91c28af4153bea185233251802"; // Replace with your actual WeatherAPI key

  const fetchWeather = async () => {
    if (!city) return;

    try {
      setError(""); // Reset error state
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );
      setWeather(response.data);
    } catch (error) {
      setWeather(null); // Reset weather state if error occurs
      setError("City not found! Please try again.");
      console.error("Error fetching weather:", error.response?.data || error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white">
      <h1 className="text-4xl font-bold mb-6">Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="p-2 border rounded mb-4 text-black"
      />
      <button
        onClick={fetchWeather}
        className="px-6 py-2 bg-white text-blue-600 rounded shadow-lg hover:bg-gray-300"
      >
        Get Weather
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {weather && weather.location && (
        <div className="mt-6 p-6 bg-white rounded-lg shadow-xl text-gray-900 max-w-sm text-center">
          <h2 className="text-2xl font-semibold">
            {weather.location.name}, {weather.location.country}
          </h2>
          <p className="text-lg">{weather.location.region}</p>
          <img
            src={`https:${weather.current.condition.icon}`}
            alt={weather.current.condition.text}
            className="mx-auto"
          />
          <p className="text-xl font-bold">{weather.current.temp_c}°C</p>
          <p>{weather.current.condition.text}</p>
          <p>Feels like: {weather.current.feelslike_c}°C</p>
          <p>Wind: {weather.current.wind_kph} kph ({weather.current.wind_dir})</p>
          <p>Humidity: {weather.current.humidity}%</p>
          <p>Pressure: {weather.current.pressure_mb} mb</p>
          <p>Visibility: {weather.current.vis_km} km</p>
        </div>
      )}
    </div>
  );
};

export default App;
