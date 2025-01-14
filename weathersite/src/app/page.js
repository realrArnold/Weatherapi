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

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Home() {
  const client = new ApiClient();
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const fetchData = async () => {
    try {
      const data = await client.getWeather({
        latitude: locations.find((loc) => loc.name === selectedLocation.name)
          .latitude,
        longitude: locations.find((loc) => loc.name === selectedLocation.name)
          .longitude,
      });

      console.log(data);

      setWeatherData({
        temperatureMax: data.daily.temperature_2m_max,
        temperatureMin: data.daily.temperature_2m_min,
        rainSum: data.daily.rain_sum,
        snowfallSum: data.daily.snowfall_sum,
        locationName: selectedLocation.name,
      });
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
    <div className="relative flex flex-col items-center justify-center min-h-screen py-8  from-blue-500 to-blue-300 bg-clouds bg-cover bg-center">
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
        <div className="grid grid-cols-1 gap-4 w-full max-w-md">
          {weatherData.temperatureMax.map((temp, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
            >
              <h2 className="text-2xl font-bold text-blue-700 mb-2">
                {days[index % 7]}
              </h2>
              <div className="text-gray-700">
                <span className="font-bold">Max Temp:</span> {temp}°C
              </div>
              <div className="text-gray-700">
                <span className="font-bold">Min Temp:</span>{" "}
                {weatherData.temperatureMin[index]}°C
              </div>
              <div className="text-gray-700">
                <span className="font-bold">Rain:</span>{" "}
                {weatherData.rainSum[index]} mm
              </div>
              <div className="text-gray-700">
                <span className="font-bold">Snowfall:</span>{" "}
                {weatherData.snowfallSum[index]} mm
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
