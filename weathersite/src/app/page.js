"use client";
import { useState, useEffect } from "react";
import { ApiClient } from "./client";

export default function Home() {
  const client = new ApiClient(); // Initialize the ApiClient
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors
  const [weatherData, setWeatherData] = useState(null); // State to store weather data
  const [location, setLocation] = useState("");
  const fetchData = async () => {
    try {
      const data = await client.getWeather({
        latitude: 51.5085,
        longitude: -0.1257,
      });
      setWeatherData(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Weather Information</h1>
    </div>
  );
}
