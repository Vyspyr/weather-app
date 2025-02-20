import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState("metric"); // 'metric' for °C & km/h, 'imperial' for °F & mph
  const canvasRef = useRef(null);

  // Fetch weather data from your own backend
  const fetchWeather = async () => {
    if (!city) return;

    try {
      const response = await fetch(`http://localhost:5000/weather?city=${city}`);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeather(null);
    }
  };

  // Handle unit conversion
  const getTemperature = () => {
    if (!weather) return "";
    return unit === "metric"
      ? `${weather.current.temp_c}°C`
      : `${weather.current.temp_f}°F`;
  };

  const getWindSpeed = () => {
    if (!weather) return "";
    return unit === "metric"
      ? `${weather.current.wind_kph} km/h`
      : `${weather.current.wind_mph} mph`;
  };

  // Background Animation (Starry Night)
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const animateBackground = () => {
      ctx.fillStyle = "rgba(15, 23, 42, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const animationFrame = setInterval(animateBackground, 1000 / 60);
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(animationFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="app-container">
      <canvas ref={canvasRef} id="backgroundCanvas"></canvas>
      <div className="content">
        <h1 className="title">Weather App</h1>
        <p className="subtitle">Enter a city to check the weather.</p>

        <div className="input-container">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="input-field"
          />
          <button onClick={fetchWeather} className="search-button">
            Get Weather
          </button>
        </div>

        {/* Unit Selection */}
        <div className="unit-toggle">
          <label>
            <input
              type="radio"
              value="metric"
              checked={unit === "metric"}
              onChange={() => setUnit("metric")}
            />
            °C & km/h
          </label>
          <label>
            <input
              type="radio"
              value="imperial"
              checked={unit === "imperial"}
              onChange={() => setUnit("imperial")}
            />
            °F & mph
          </label>
        </div>

        {/* Display Weather Data */}
        {weather && (
          <div className="weather-card">
            <h2>{weather.location.name}, {weather.location.country}</h2>
            <p>Temperature: {getTemperature()}</p>
            <p>Condition: {weather.current.condition.text}</p>
            <p>Wind Speed: {getWindSpeed()}</p>
            <img src={weather.current.condition.icon} alt="Weather Icon" />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
