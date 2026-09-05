import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY =  "4a8f26f25fe397fcc1d3129c7c460cea";

  const getWeather = async () => {
    if (!city) {
      setError("Please enter a city");
      return;
    }

    try {
      setError("");

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data);
    } catch {
      setWeather(null);
      setError("City not found");
    }
  };

  return (
    <div className="app">
      <h1>🌤️ Weather App</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button onClick={getWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}
      {!weather && !error && (
  <div className="welcome">
    <div className="welcome-icon">🌤️</div>
    <h2>How's the weather today?</h2>
    <p>Enter a city above to discover its weather.</p>
  </div>
)}

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>

          <h1>{Math.round(weather.main.temp)}°C</h1>

          <p>{weather.weather[0].description}</p>

          <p>💧 Humidity: {weather.main.humidity}%</p>

          <p>💨 Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;