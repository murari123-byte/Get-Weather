import React from "react";

const weatherCodeToIcon = (code) => {
  if ([0].includes(code)) return "☀️";
  if ([1, 2, 3].includes(code)) return "⛅";
  if ([45, 48].includes(code)) return "🌫️";
  if ([51, 53, 55, 56, 57].includes(code)) return "🌦️";
  if ([61, 63, 65, 80, 81, 82].includes(code)) return "🌧️";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "❄️";
  if ([95, 96, 99].includes(code)) return "⛈️";
  return "❔";
};

function ForecastCard({ daily }) {
  if (!daily || !daily.time) return null;
  
  return (
    <div className="forecast-card">
      <h3>Today & Tomorrow</h3>
      <ul style={{padding: 0, listStyle: "none"}}>
        {[0, 1].map((i) => (
          daily.time[i] ? (
            <li key={daily.time[i]} style={{margin: "0.6em 0"}}>
              <span>{i === 0 ? "Today" : "Tomorrow"} ({daily.time[i]}) </span>
              <span style={{fontSize: "1.2em"}}>{weatherCodeToIcon(daily.weathercode[i])}</span>{" "}
              <span>Min: {daily.temperature_2m_min[i]}°C </span>
              <span>Max: {daily.temperature_2m_max[i]}°C</span>
            </li>
          ) : null
        ))}
      </ul>
    </div>
  );
}

export default ForecastCard;
