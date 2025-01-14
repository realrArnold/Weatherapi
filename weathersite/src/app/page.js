"use client";
import { useState, useEffect } from "react";
import { ApiClient } from "./client";

const locations = [
  { name: "London", latitude: 51.5085, longitude: -0.1257 },
  { name: "New York", latitude: 40.7143, longitude: -74.006 },
  { name: "Tokyo", latitude: 35.6895, longitude: 139.6917 },
];

export default function Home() {
  const client = new ApiClient(); // Initialize the ApiClient
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors
  const [weatherData, setWeatherData] = useState(null); // State to store weather data
  // const [location, setLocation] = useState("");
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
    <div>
      <h1>Weather Information</h1>

      <div>
        <select
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
    </div>
  );
}
