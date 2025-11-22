import WeatherButton from "./WeatherButton";

function WeatherButtonRow({ displayWeatherType, handleType }) {
  return (
    <div className="mt-10 flex items-center gap-10 gap-12 rounded-xl border border-stone-200 bg-white px-4 py-2">
      <WeatherButton
        type="current"
        handleType={handleType}
        displayWeatherType={displayWeatherType}
      >
        Current
      </WeatherButton>

      <WeatherButton
        type="hourly"
        handleType={handleType}
        displayWeatherType={displayWeatherType}
      >
        Hourly
      </WeatherButton>

      <WeatherButton
        type="weekly"
        handleType={handleType}
        displayWeatherType={displayWeatherType}
      >
        Days
      </WeatherButton>
    </div>
  );
}

export default WeatherButtonRow;
