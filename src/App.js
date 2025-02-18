import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [distanceUnit, setDistanceUnit] = useState("km");
  const [tempUnit, setTempUnit] = useState("C");

  const API_KEY = "0acee91c28af4153bea185233251802";

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-900 to-blue-900 p-6 text-white transition-all duration-500 w-full text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-extrabold mb-6"
      >
        Weather App
      </motion.h1>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 rounded-xl shadow-xl flex flex-col items-center justify-center w-full max-w-lg mx-auto"
      >
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-4 border border-gray-600 rounded-lg w-full bg-gray-700 text-white focus:outline-none focus:ring-4 focus:ring-blue-500 transition text-center"
        />
        <div className="flex mt-4 gap-4 text-white justify-center">
          <label className="flex items-center">
            <input
              type="radio"
              name="distanceUnit"
              value="km"
              checked={distanceUnit === "km"}
              onChange={() => setDistanceUnit("km")}
              className="mr-2"
            />
            km
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="distanceUnit"
              value="miles"
              checked={distanceUnit === "miles"}
              onChange={() => setDistanceUnit("miles")}
              className="mr-2"
            />
            miles
          </label>
        </div>
        <div className="flex mt-4 gap-4 text-white justify-center">
          <label className="flex items-center">
            <input
              type="radio"
              name="tempUnit"
              value="C"
              checked={tempUnit === "C"}
              onChange={() => setTempUnit("C")}
              className="mr-2"
            />
            °C
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="tempUnit"
              value="F"
              checked={tempUnit === "F"}
              onChange={() => setTempUnit("F")}
              className="mr-2"
            />
            °F
          </label>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchWeather}
          className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 w-full"
        >
          Get Weather
        </motion.button>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {weather && weather.location && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 p-8 bg-gray-900 text-white rounded-lg shadow-xl w-full text-center"
          >
            <h2 className="text-2xl font-semibold text-blue-400">
              {weather.location.name}, {weather.location.country}
            </h2>
            <p className="text-lg">{weather.location.region}</p>
            <motion.img
              src={`https:${weather.current.condition.icon}`}
              alt={weather.current.condition.text}
              className="mx-auto w-20 h-20"
              animate={{ rotate: 20 }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <p className="text-3xl font-bold text-blue-400">
              {tempUnit === "C" ? `${weather.current.temp_c}°C` : `${weather.current.temp_f}°F`}
            </p>
            <p className="text-lg">{weather.current.condition.text}</p>
            <p>Feels like: {tempUnit === "C" ? `${weather.current.feelslike_c}°C` : `${weather.current.feelslike_f}°F`}</p>
            <div className="mt-4 flex justify-between text-sm">
              <p>💨 Wind: {distanceUnit === "km" ? `${weather.current.wind_kph} kph` : `${weather.current.wind_mph} mph`} ({weather.current.wind_dir})</p>
              <p>💧 Humidity: {weather.current.humidity}%</p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default App;
