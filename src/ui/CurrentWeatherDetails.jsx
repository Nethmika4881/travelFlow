import { useWeather } from "@/hooks/useWeatherData";
import { getWeatherIcon } from "@/lib/utils";
import Spinner from "./Spinner";
import ErrorComponent from "./ErrorComponent";
import {
  CloudRain,
  ThermometerSnowflake,
  ThermometerSun,
  TrendingDown,
  TrendingUp,
  Droplets,
  Sun,
  Wind,
  Eye,
} from "lucide-react";

function CurrentWeatherDetails({ location }) {
  const {
    weatherData: { current: currentWeatherData },
    isLoading,
    error,
  } = useWeather(location);
  if (isLoading) return <Spinner />;
  if (error) return <ErrorComponent />;
  if (!currentWeatherData) return <div>No weather data available</div>;
  console.log(currentWeatherData);
  const {
    currentTime,
    isDaytime,
    weatherCondition: {
      description: { text: conditionText },
      type: weatherType,
    },
    temperature: { degrees: temp, unit: tempUnit },
    feelsLikeTemperature: { degrees: feelsLike, unit: feelsLikeUnit },
    relativeHumidity,
    uvIndex,
    precipitation: {
      probability: { percent: precipPercent },
    },
    wind: {
      direction: { cardinal: windDirection },
      speed: { value: windSpeed, unit: windSpeedUnit },
    },
    visibility: { distance: visibilityDistance, unit: visibilityUnit },
    currentConditionsHistory: {
      temperatureChange: { degrees: tempChange, unit: tempChangeUnit },
      maxTemperature: { degrees: maxTemp, unit: maxTempUnit },
      minTemperature: { degrees: minTemp, unit: minTempUnit },
      qpf: { quantity: historyRain, unit: historyRainUnit },
    },
  } = currentWeatherData;

  //get icon
  const icon = getWeatherIcon(weatherType, isDaytime);

  return (
    <div className="mt-4 min-h-100 w-full px-2 py-4">
      <CurrentBasicDetails
        icon={icon}
        feelsLike={feelsLike}
        feelsLikeUnit={feelsLikeUnit}
        temperatureChange={tempChange}
        temperatureChangeUnit={tempChangeUnit}
        temp={temp}
        tempUnit={tempUnit}
        weatherType={weatherType}
        conditionText={conditionText}
      />
      <div className="my-4 border-b-2 border-stone-100"></div>
      <DailyFigures
        maxTemp={maxTemp}
        minTemp={minTemp}
        maxTempUnit={maxTempUnit}
        minTempUnit={minTempUnit}
        qpf={historyRain}
        qpfUnit={historyRainUnit}
      />
      <div className="my-4 border-b-2 border-stone-100"></div>
      <WeatherMetrics
        humidity={relativeHumidity}
        uvIndex={uvIndex}
        precipPercent={precipPercent}
        windSpeed={windSpeed}
        windSpeedUnit={windSpeedUnit}
        windDirection={windDirection}
        visibility={visibilityDistance}
        visibilityUnit={visibilityUnit}
      />
    </div>
  );
}

export default CurrentWeatherDetails;

const CurrentBasicDetails = function ({
  icon,
  feelsLike,
  feelsLikeUnit,
  temperatureChange,
  temp,
  tempUnit,
  temperatureChangeUnit,
  conditionText,
}) {
  return (
    <div className="flex justify-between font-sans">
      <div className="flex flex-col gap-3">
        <h1 className="text-5xl font-semibold text-stone-800">
          {temp}
          {tempUnit === "CELSIUS" ? "℃" : "℉"}
        </h1>
        <h3 className="text-xl font-normal text-stone-600">
          Feels Like {feelsLike}
          {feelsLikeUnit === "CELSIUS" ? "℃" : "℉"}
        </h3>
        <p className="flex items-center gap-2 font-normal">
          <span>
            {temperatureChange > 0 ? (
              <TrendingUp size={15} strokeWidth={2} color="#1971c2" />
            ) : (
              <TrendingDown size={15} strokeWidth={2} color="#1971c2" />
            )}
          </span>

          <span>
            {temperatureChange}
            {temperatureChangeUnit === "CELSIUS" ? "℃" : "℉"} in last hour
          </span>
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-5xl">{icon}</span>
        <span className="text-2xl">{conditionText}</span>
      </div>
    </div>
  );
};

const DailyFigures = function ({
  maxTemp,
  minTemp,
  maxTempUnit,
  minTempUnit,
  qpf,
  qpfUnit,
}) {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
      {/* Today's High */}
      <div className="flex items-center gap-3">
        <ThermometerSun className="text-orange-500" size={24} />
        <div className="flex flex-col gap-1">
          <h4 className="font-sans text-[1rem] font-normal text-stone-600">
            Today's High
          </h4>
          <span className="font-sans text-lg font-semibold text-stone-800">
            {maxTemp} {maxTempUnit === "CELSIUS" ? "℃" : "℉"}
          </span>
        </div>
      </div>

      {/* Today's Low */}
      <div className="flex items-center gap-3">
        <ThermometerSnowflake className="text-blue-400" size={24} />
        <div className="flex flex-col gap-1">
          <h4 className="font-sans text-[1rem] font-normal text-stone-600">
            Today's Low
          </h4>
          <span className="font-sans text-lg font-semibold text-stone-800">
            {minTemp}
            {minTempUnit === "CELSIUS" ? "℃" : "℉"}
          </span>
        </div>
      </div>

      {/* Rainfall Today */}
      <div className="flex items-center gap-3">
        <CloudRain className="text-blue-300" size={24} />
        <div className="flex flex-col gap-1">
          <h4 className="font-sans text-[1rem] font-normal text-stone-600">
            Rainfall Today
          </h4>
          <span className="font-sans text-lg font-semibold text-stone-800">
            {qpf}
            {qpfUnit === "MILLIMETERS" ? " mm" : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

const WeatherMetrics = function ({
  humidity,
  uvIndex,
  precipPercent,
  windSpeed,
  windSpeedUnit,
  windDirection,
  visibility,
  visibilityUnit,
}) {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
      {/* Humidity */}
      <div className="flex items-center gap-3">
        <Droplets className="text-cyan-400" size={24} />
        <div className="flex flex-col gap-1">
          <h4 className="font-sans text-[1rem] font-normal text-stone-600">
            Humidity
          </h4>
          <span className="font-sans text-lg font-semibold text-stone-800">
            {humidity}%
          </span>
        </div>
      </div>

      {/* UV Index */}
      <div className="flex items-center gap-3">
        <Sun className="text-yellow-400" size={24} />
        <div className="flex flex-col gap-1">
          <h4 className="font-sans text-[1rem] font-normal text-stone-600">
            UV Index
          </h4>
          <span className="font-sans text-lg font-semibold text-stone-800">
            {uvIndex}
          </span>
        </div>
      </div>

      {/* Rain Probability */}
      <div className="flex items-center gap-3">
        <CloudRain className="text-blue-400" size={24} />
        <div className="flex flex-col gap-1">
          <h4 className="font-sans text-[1rem] font-normal text-stone-600">
            Rain
          </h4>
          <span className="font-sans text-lg font-semibold text-stone-800">
            {precipPercent}%
          </span>
        </div>
      </div>

      {/* Wind */}
      <div className="flex items-center gap-3">
        <Wind className="text-emerald-400" size={24} />
        <div className="flex flex-col gap-1">
          <h4 className="font-sans text-[1rem] font-normal text-stone-600">
            Wind
          </h4>
          <span className="font-sans text-lg font-semibold text-stone-800">
            {windSpeed} {windSpeedUnit === "KILOMETERS_PER_HOUR" ? "km/h" : ""}{" "}
            {windDirection}
          </span>
        </div>
      </div>

      {/* Visibility */}
      <div className="flex items-center gap-3">
        <Eye className="text-gray-400" size={24} />
        <div className="flex flex-col gap-1">
          <h4 className="font-sans text-[1rem] font-normal text-stone-600">
            Visibility
          </h4>
          <span className="font-sans text-lg font-semibold text-stone-800">
            {visibility} {visibilityUnit === "KILOMETERS" ? "km" : ""}
          </span>
        </div>
      </div>
    </div>
  );
};
