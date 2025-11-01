import React, { useState } from "react";
import CityInput from "./components/CItyInput";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";

// Geocode utility
async function geocodeCity(city) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.length > 0) {
    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
      displayName: data[0].display_name,
    };
  }
  throw new Error("City not found");
}

// Weather utility
async function fetchWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_min,temperature_2m_max,weathercode&timezone=auto`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.current_weather && data.daily) {
    return data; // Returns { current_weather, daily }
  }
  throw new Error("No weather or forecast data found");
}


function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [forecast, setForecast] = useState(null);

  const handleSearch = async () => {
    setWeather(null);
    setError("");
    setLoading(true);
    try {
      const geo = await geocodeCity(city);
      setDisplayName(geo.displayName);
      const weatherData = await fetchWeather(geo.lat, geo.lon);
      setWeather(weatherData.current_weather);
      setForecast(weatherData.daily);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleGeolocate = async () => {
    setWeather(null);
    setError("");
    setLoading(true);
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          setDisplayName("Your Current Location");
          const weatherData = await fetchWeather(latitude, longitude);
          setWeather(weatherData.current_weather);
          setForecast(weatherData.daily);
        } catch (err) {
          setError(err.message || "Could not get weather for your location.");
          setLoading(false);
        }
      },
      () => {
        setError("Unable to retrieve your location.");
        setLoading(false);
      }
    );
  };

  return (
    <div className="container">
      <h1>Weather Now</h1>
      <CityInput
        city={city}
        onCityChange={setCity}
        onSearch={handleSearch}
        onGeolocate={handleGeolocate}
        loading={loading}
      />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <WeatherCard weather={weather} displayName={displayName} />
      <ForecastCard daily={forecast} />

    </div>
  );
}

export default App;
