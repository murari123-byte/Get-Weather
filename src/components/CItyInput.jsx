import React from "react";

function CityInput({
  city,
  onCityChange,
  onSearch,
  onGeolocate,
  loading
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}>
      <input
        value={city}
        onChange={e => onCityChange(e.target.value)}
        placeholder="Enter city name"
        required
        className="input"
      />
      <button type="submit" disabled={loading}>Get Weather</button>
      <button type="button" onClick={onGeolocate} disabled={loading}>
        Use My Location
      </button>
    </form>
  );
}

export default CityInput;
