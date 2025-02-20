import React, { useState, useEffect, useRef } from "react";
import { starryNight } from "./backgroundAnimations"; // Ensure this file exists
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // 🔹 Function to resize the canvas dynamically
    const resizeCanvas = () => {
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      ctx.clearRect(0, 0, innerWidth, innerHeight); // Prevents leftover drawings
    };

    // 🔹 Set initial size & start animation
    resizeCanvas();
    const animateBackground = starryNight(canvas, ctx);
    const animationFrame = setInterval(animateBackground, 1000 / 60);

    // 🔹 Ensure the canvas resizes dynamically on window changes
    window.addEventListener("resize", resizeCanvas);

    return () => {
      clearInterval(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="app-container">
      {/* Starry night background */}
      <canvas ref={canvasRef} id="backgroundCanvas"></canvas>

      {/* Main content */}
      <div className="content">
        <h1>Weather App</h1>
        <p>Enter a city to check the weather:</p>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="search-input"
        />
        <button onClick={() => console.log("Fetching Weather")} className="search-button">
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
    </div>
  );
};

export default App;
