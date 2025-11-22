import { useWeather } from "@/hooks/useWeatherData";
import { getWeatherIcon } from "@/lib/utils";
import Spinner from "./Spinner";
import ErrorComponent from "./ErrorComponent";
import { Droplets } from "lucide-react";
import Topic from "./Topic";

function HourlyWeatherDetails({ location }) {
  const {
    weatherData: { hourly: hourlyData },
    isLoading,
    error,
  } = useWeather(location);
  console.log(hourlyData);
  if (isLoading) return <Spinner />;
  if (error) return <ErrorComponent />;
  if (!hourlyData) return <div>No weather data available</div>;
  console.log(hourlyData);
  return (
    <div className="mt-4 w-full px-2 py-4">
      <h1>
        <span className="text-3xl font-semibold text-stone-600">
          Next 24 hours weather predictions
        </span>
      </h1>

      {hourlyData.forecastHours.map((hour, index) => (
        <HourlyWeatherRow key={index} hour={hour} />
      ))}
    </div>
  );
}

export default HourlyWeatherDetails;

function HourlyWeatherRow({ hour }) {
  const {
    displayDateTime: { hours, minutes },
    weatherCondition: {
      description: { text: conditionText },
      type: weatherType,
    },
    temperature: { degrees: temp },
    precipitation: {
      probability: { percent: precipPercent },
    },
    isDaytime,
  } = hour;

  const formatTime = (hours, minutes) => {
    const period = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 || 12;
    return `${hour12}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  const icon = getWeatherIcon(weatherType, isDaytime);

  return (
    <div className="flex place-content-start items-center justify-between border-b border-stone-200 py-4 font-sans last:border-b-0">
      <div className="grid w-full grid-cols-2">
        {/* Left side */}
        <div className="flex items-center gap-3 font-sans md:gap-4">
          <span className="text-2xl md:text-3xl">{icon}</span>
          <div className="flex flex-col">
            <span className="text-base font-semibold text-stone-900 md:text-xl">
              {formatTime(hours, minutes)}
            </span>
            <span className="text-sm text-stone-600 md:text-base">
              {conditionText}
            </span>
          </div>
        </div>

        {/* Right side */}
        <div className="flex place-content-end items-center gap-4 font-sans md:gap-6">
          <div className="flex items-center gap-1 md:gap-2">
            <Droplets className="text-blue-500" size={18} />
            <span className="text-base font-medium text-stone-700 md:text-lg">
              {precipPercent}%
            </span>
          </div>
          <span className="min-w-15 font-sans text-xl font-bold text-stone-900 md:text-2xl">
            {temp}°
          </span>
        </div>
      </div>
    </div>
  );
}
