"use client";
import { useState, useEffect } from "react";
import { ApiClient } from "./client";
import WeatherIcons from "./components/weatherIcons"; // WeatherIcons Component
import {
  FaArrowUp,
  FaArrowRight,
  FaArrowDown,
  FaArrowLeft,
} from "react-icons/fa";

// Define locations
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

// Define wind direction icons
const windDirectionIcons = {
  North: <FaArrowDown />,
  East: <FaArrowLeft />,
  South: <FaArrowUp />,
  West: <FaArrowRight />,
};

const getWindDirectionIcon = (windDirection) => {
  if ((windDirection >= 0 && windDirection <= 45) || windDirection > 315) {
    return windDirectionIcons["North"];
  } else if (windDirection > 45 && windDirection <= 135) {
    return windDirectionIcons["East"];
  } else if (windDirection > 135 && windDirection <= 225) {
    return windDirectionIcons["South"];
  } else if (windDirection > 225 && windDirection <= 315) {
    return windDirectionIcons["West"];
  }
};

// Helper function to get the next 7 day labels
const getNextSevenDayLabels = () => {
  const today = new Date();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dayLabels = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i); // Increment the date

    if (i === 0) {
      // Today
      dayLabels.push("Today");
    } else {
      const dayName = dayNames[date.getDay()];
      const dayDate = date.getDate();
      const monthName = monthNames[date.getMonth()];
      dayLabels.push(
        `${dayName} ${dayDate}${getOrdinalSuffix(dayDate)} ${monthName}`
      );
    }
  }

  return dayLabels;
};

// Helper function to get the ordinal suffix for a date
const getOrdinalSuffix = (day) => {
  if (day > 3 && day < 21) return "th"; // 4th-20th
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export default function Home() {
  const client = new ApiClient();
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [dayLabels, setDayLabels] = useState(getNextSevenDayLabels()); // Get dynamic day labels

  const fetchData = async () => {
    try {
      const data = await client.getWeather({
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
      });

      console.log("API Response:", data);

      setWeatherData({
        temperatureMax: data.daily.temperature_2m_max,
        temperatureMin: data.daily.temperature_2m_min,
        rainSum: data.daily.rain_sum,
        snowfallSum: data.daily.snowfall_sum,
        weatherCodes: data.daily.weather_code,
        locationName: selectedLocation.name,
        windDirection: data.daily.wind_direction_10m_dominant,
      });
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedLocation]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen py-8 bg-clouds bg-cover bg-center from-blue-500 to-blue-300">
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
        <div className="grid grid-cols-1 gap-6 w-full max-w-lg">
          {weatherData.temperatureMax.map((temp, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
            >
              <h2 className="text-2xl font-bold text-blue-700 mb-4">
                {dayLabels[index]} {/* Use dynamic day labels */}
              </h2>

              <WeatherIcons iconKey={weatherData.weatherCodes[index]} />

              <div className="text-gray-700 mt-4">
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
              <div className="flex items-center justify-center text-gray-700 mt-2">
                <span className="font-bold mr-2">Wind:</span>
                {getWindDirectionIcon(weatherData.windDirection[index])}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
