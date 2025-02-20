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
      canvas.width = window.innerWidth * 2;
      canvas.height = window.innerHeight * 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Ensure canvas redraws
    };

    // Set initial size & start animation
    resizeCanvas();
    const animateBackground = starryNight(canvas, ctx);
    const animationFrame = setInterval(animateBackground, 1000/60);

    // Listen for window resize & adjust canvas dynamically
    window.addEventListener("resize", resizeCanvas);

    return () => {
      clearInterval(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const fetchWeather = async () => {
    if (!city) {
      alert("Please enter a city!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/weather?city=${city}`);
      if (!response.ok) throw new Error("City not found");

      const data = await response.json();
      if (!data || !data.location || !data.current) {
        throw new Error("Invalid API response");
      }

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
      <canvas ref={canvasRef} id="backgroundCanvas"></canvas>
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
    </div>
  );
};

export default App;
