import React from "react";

function WeatherCard({ weather, displayName }) {
  if (!weather) return null;
  return (
    <div className="weather-card">
      <h2>{displayName}</h2>
      <div>Temperature: <strong>{weather.temperature}°C</strong></div>
      <div>Wind: {weather.windspeed} m/s</div>
      <div>Time: {weather.time}</div>
      {/* I will add more details or icons if desired */}
    </div>
  );
}

export default WeatherCard;
