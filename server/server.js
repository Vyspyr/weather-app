import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Allow frontend requests
app.use(express.json());

// ✅ Debug: Ensure API key is loaded
console.log("Weather API Key:", process.env.WEATHER_API_KEY);

// ✅ API Route: Fetch Weather Data
app.get("/weather", async (req, res) => {
  const { city } = req.query;

  // 🔹 Validate city input
  if (!city) {
    return res.status(400).json({ error: "City parameter is required" });
  }

  try {
    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey) throw new Error("Missing API key");

    // 🔹 Fetch weather data from WeatherAPI
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
    );

    res.json(response.data);
  } catch (error) {
    console.error("Weather API Error:", error.message);
    
    if (error.response) {
      // 🔹 API responded with an error
      res.status(error.response.status).json({
        error: error.response.data.error || "Failed to fetch weather data",
      });
    } else {
      // 🔹 Other errors (e.g., network issues)
      res.status(500).json({ error: "Failed to fetch weather data" });
    }
  }
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
