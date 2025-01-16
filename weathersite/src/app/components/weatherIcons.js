import React from "react";
import { weatherData } from "@/app/data/weatherData";

const WeatherIcons = ({ iconKey }) => {
  const selectedIcon = weatherData[iconKey]?.day?.image;
  
const selectedInfo = weatherData[iconKey]?.day?.description;
  return (
    <div className="flex flex-col items-center p-4 bg-blue-50 shadow-md rounded-md">
      <img src={selectedIcon} className="w-16 h-16 object-contain mb-2" />
      <p className="text-lg font-medium text-gray-700">{selectedInfo}</p>
    </div>
  );
};

export default WeatherIcons;
