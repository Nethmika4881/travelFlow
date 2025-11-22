import CurrentWeatherDetails from "./CurrentWeatherDetails";
import HourlyWeatherDetails from "./HourlyWeatherDetails";
import WeeklyWeatherDetails from "./WeeklyWeatherDetails";

function WeatherCardBox({ displayWeatherType, location }) {
  return (
    <div>
      {displayWeatherType === "current" && (
        <CurrentWeatherDetails location={location} />
      )}
      {displayWeatherType === "hourly" && (
        <HourlyWeatherDetails location={location} />
      )}
      {displayWeatherType === "weekly" && (
        <WeeklyWeatherDetails location={location} />
      )}
    </div>
  );
}

export default WeatherCardBox;
