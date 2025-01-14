"use client";
import { useState, useEffect } from "react";
import { ApiClient } from "./client";

const locations = [
  { name: "London", latitude: 51.5085, longitude: -0.1257 },
  { name: "New York", latitude: 40.7143, longitude: -74.006 },
  { name: "Tokyo", latitude: 35.6895, longitude: 139.6917 },
  { name: "Sydney", latitude: -33.8678, longitude: 151.2073 },
  { name: "Paris", latitude: 48.8534, longitude: 2.3488 },
  { name: "Cairo", latitude: 30.0626, longitude: 31.2497 },
  { name: "Moscow", latitude: 55.7522, longitude: 37.6156 },
  { name: "Beijing", latitude: 39.9075, longitude: 116.3972 },
  { name: "Berlin", latitude: 52.5244, longitude: 13.4105 },
  { name: "Madrid", latitude: 40.4165, longitude: -3.7026 },
];

export default function Home() {
  const client = new ApiClient(); // Initialize the ApiClient
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors
  const [weatherData, setWeatherData] = useState(null); // State to store weather data

  const fetchData = async () => {
    try {
      const data = await client.getWeather({
        latitude: locations.find((loc) => loc.name === selectedLocation.name)
          .latitude,
        longitude: locations.find((loc) => loc.name === selectedLocation.name)
          .longitude,
      });
      setWeatherData({ ...data, locationName: selectedLocation.name });
      console.log(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedLocation]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gradient-to-b from-blue-500 to-blue-300">
      <h1 className="text-4xl font-bold text-white mb-8">
        Weather in {selectedLocation.name}
      </h1>

      <div className="mb-6">
        <select
          className="px-4 py-2 rounded-md shadow-md text-blue-800 font-medium"
          value={selectedLocation.name}
          onChange={(e) => {
            const location = locations.find(
              (loc) => loc.name === e.target.value
            );
            setSelectedLocation(location);
          }}
        >
          {locations.map((location) => (
            <option key={location.name} value={location.name}>
              {location.name}
            </option>
          ))}
        </select>
      </div>

      {loading && <div className="text-white">Loading weather data...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {weatherData && (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            {weatherData.locationName}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-gray-700">
              <span className="font-bold">Temperature:</span>{" "}
              {weatherData.hourly.temperature_80m[0]}°C
            </div>
            <div className="text-gray-700">
              <span className="font-bold">Rain:</span>{" "}
              {weatherData.hourly.rain[0]} mm
            </div>
            <div className="text-gray-700">
              <span className="font-bold">Snowfall:</span>{" "}
              {weatherData.hourly.snowfall[0]} mm
            </div>
            <div className="text-gray-700">
              <span className="font-bold">Visibility:</span>{" "}
              {weatherData.hourly.visibility[0]} m
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
