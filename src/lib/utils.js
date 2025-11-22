import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import React from "react";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function SmartSplit(text) {
  if (!text) return null;

  const cleaned = text.trim();

  // Middle index of the text
  const mid = Math.floor(cleaned.length / 2);

  // Find nearest full stop after the midpoint
  let splitIndex = cleaned.indexOf(".", mid);

  // If no full stop after the midpoint, find before midpoint
  if (splitIndex === -1) {
    splitIndex = cleaned.lastIndexOf(".", mid);
  }

  // Fallback: if still no full stop (rare), split at the midpoint
  if (splitIndex === -1) {
    splitIndex = mid;
  }

  const firstPara = cleaned.slice(0, splitIndex + 1);
  const secondPara = cleaned.slice(splitIndex + 1).trim();

  return [firstPara, secondPara];
}

export function getWeatherIcon(weatherType, isDaytime = true) {
  const type = weatherType?.toUpperCase() || "";

  switch (type) {
    // Thunderstorm conditions
    case "HEAVY_THUNDERSTORM":
      return "⛈️";
    case "THUNDERSTORM":
      return "🌩️";
    case "SCATTERED_THUNDERSTORMS":
    case "ISOLATED_THUNDERSTORMS":
      return "⛈️";

    // Rain conditions
    case "HEAVY_RAIN":
      return "🌧️";
    case "RAIN":
      return "🌧️";
    case "LIGHT_RAIN":
      return "🌦️";
    case "RAIN_SHOWERS":
      return "🌧️";
    case "LIGHT_RAIN_SHOWERS":
      return "🌦️";
    case "DRIZZLE":
      return "🌦️";
    case "SHOWERS":
      return "🌧️";

    // Cloud conditions
    case "CLOUDY":
      return "☁️";
    case "MOSTLY_CLOUDY":
      return isDaytime ? "🌥️" : "☁️";
    case "PARTLY_CLOUDY":
      return isDaytime ? "⛅" : "☁️";
    case "MOSTLY_CLEAR":
    case "PARTLY_CLEAR":
      return isDaytime ? "🌤️" : "🌙";

    // Clear conditions
    case "CLEAR":
    case "SUNNY":
      return isDaytime ? "☀️" : "🌙";

    // Snow conditions
    case "SNOW":
      return "❄️";
    case "LIGHT_SNOW":
      return "🌨️";
    case "HEAVY_SNOW":
      return "❄️";
    case "SNOW_SHOWERS":
      return "🌨️";
    case "SLEET":
      return "🌨️";
    case "FREEZING_RAIN":
      return "🌧️";

    // Fog and mist
    case "FOG":
    case "MIST":
    case "HAZE":
      return "🌫️";

    // Wind
    case "WINDY":
      return "💨";

    // Severe weather
    case "TORNADO":
      return "🌪️";
    case "HURRICANE":
    case "TROPICAL_STORM":
      return "🌀";

    // Dust and smoke
    case "DUST":
    case "SAND":
      return "💨";
    case "SMOKE":
      return "🌫️";

    // Hot/Cold
    case "HOT":
      return "🌡️";
    case "COLD":
      return "🥶";

    default:
      return "🌍";
  }
}
