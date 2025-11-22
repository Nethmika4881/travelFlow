import { useWeather } from "@/hooks/useWeatherData";
import { getWeatherIcon } from "@/lib/utils";
import Spinner from "./Spinner";
import ErrorComponent from "./ErrorComponent";
import { CloudRain, Droplets, Zap, Sun, Moon, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function WeeklyWeatherDetails({ location }) {
  const {
    weatherData: { daily: dailyData },
    isLoading,
    error,
  } = useWeather(location);

  // State to track which row is expanded (null means none expanded)
  const [expandedIndex, setExpandedIndex] = useState(null);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorComponent />;
  if (!dailyData) return <div>No weather data available</div>;

  const handleToggle = (index) => {
    // If clicking the already expanded row, collapse it
    // Otherwise, expand the clicked row and collapse others
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="mt-6 w-full px-2 py-4 md:px-4 md:py-6">
      <h1 className="mb-4 md:mb-6">
        <span className="text-2xl font-semibold text-stone-600 md:text-3xl">
          Next 5 days weather predictions
        </span>
      </h1>

      {/* Column Headers - Hidden on mobile, visible on md+ */}
      <div className="mb-3 hidden grid-cols-[auto_1fr_auto_auto_auto_auto_auto] items-center gap-6 border-b-2 border-stone-300 pb-3 md:grid md:gap-8">
        <div className="col-span-2">
          <span></span>
        </div>
        <div className="w-20 text-center">
          <span className="font-sans text-xs font-medium tracking-wide text-stone-500 uppercase md:text-sm">
            Rain
          </span>
        </div>
        <div className="w-20 text-center">
          <span className="font-sans text-xs font-medium tracking-wide text-stone-500 uppercase md:text-sm">
            Storm
          </span>
        </div>
        <div className="w-24 text-center">
          <span className="font-sans text-xs font-medium tracking-wide text-stone-500 uppercase md:text-sm">
            QPF
          </span>
        </div>
        <div className="w-28 text-center">
          <span className="font-sans text-xs font-medium tracking-wide text-stone-500 uppercase md:text-sm">
            Temp
          </span>
        </div>
        <div className="w-12"></div>
      </div>

      {dailyData.forecastDays.map((day, index) => (
        <WeeklyWeatherDetailsRow
          key={index}
          day={day}
          index={index}
          isExpanded={expandedIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
}

function WeeklyWeatherDetailsRow({ day, index, isExpanded, onToggle }) {
  const {
    displayDate: { year, month, day: dayNum },
    daytimeForecast,
    nighttimeForecast,
    maxTemperature: { degrees: maxTemp },
    minTemperature: { degrees: minTemp },
  } = day;

  const formatDate = (year, month, day) => {
    const date = new Date(year, month - 1, day);
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayNamesFull = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
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

    return {
      dayName: dayNames[date.getDay()],
      dayNameFull: dayNamesFull[date.getDay()],
      dateStr: `${monthNames[month - 1]} ${day}`,
    };
  };

  const { dayName, dayNameFull, dateStr } = formatDate(year, month, dayNum);
  const daytimeIcon = getWeatherIcon(
    daytimeForecast.weatherCondition.type,
    true,
  );
  const nighttimeIcon = getWeatherIcon(
    nighttimeForecast.weatherCondition.type,
    false,
  );

  return (
    <>
      {/* DAYTIME ROW - Mobile Layout (simplified) */}
      <div
        className={`col-span-7 mb-2 rounded-lg border px-3 py-4 transition-all duration-300 md:hidden ${
          isExpanded
            ? "border-blue-200/40 bg-blue-50/40"
            : "border-stone-200 bg-white"
        }`}
      >
        {/* Mobile: Top Section - Icon, Day, Temps */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{daytimeIcon}</span>
            <div className="flex flex-col">
              <span className="font-sans text-lg font-semibold text-stone-900">
                {dayName}
              </span>
              <span className="font-sans text-xs text-stone-500">
                {dateStr}
              </span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-stone-900">
              {maxTemp}°
            </span>
            <span className="text-xl font-normal text-stone-500">
              {minTemp}°
            </span>
          </div>
        </div>

        {/* Mobile: Bottom Section - Condition & QPF */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-stone-600">
            {daytimeForecast.weatherCondition.description.text}
          </span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Droplets className="text-blue-500" size={16} />
              <span className="text-sm font-semibold text-stone-800">
                {daytimeForecast.precipitation.probability.percent}%
              </span>
            </div>
            <span className="text-sm font-semibold text-stone-800">
              {daytimeForecast.precipitation.qpf.quantity} mm
            </span>
            <button
              onClick={onToggle}
              className="flex cursor-pointer items-center justify-center rounded-lg p-1 transition-all duration-300 hover:bg-stone-200"
              aria-label={
                isExpanded ? "Hide night forecast" : "Show night forecast"
              }
            >
              <ChevronDown
                className={`text-stone-600 transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : "rotate-0"
                }`}
                size={20}
              />
            </button>
          </div>
        </div>

        {/* Mobile: Expanded Night Section */}
        {isExpanded && (
          <div className="mt-3 border-t border-stone-200 pt-3">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-3xl">{nighttimeIcon}</span>
                <span className="font-sans text-base font-semibold text-stone-700">
                  Night
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-stone-600">
                {nighttimeForecast.weatherCondition.description.text}
              </span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Droplets className="text-blue-500" size={16} />
                  <span className="text-sm font-semibold text-stone-800">
                    {nighttimeForecast.precipitation.probability.percent}%
                  </span>
                </div>
                <span className="text-sm font-semibold text-stone-800">
                  {nighttimeForecast.precipitation.qpf.quantity} mm
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* DAYTIME ROW - Desktop Layout (full details) */}
      <div
        className={`col-span-7 hidden grid-cols-[auto_1fr_auto_auto_auto_auto_auto] items-center gap-6 rounded-sm border-b px-2 py-5 transition-all duration-300 md:grid md:gap-8 md:py-6 ${
          isExpanded
            ? "border-blue-200/40 bg-blue-50/40"
            : "border-stone-200 bg-white hover:bg-stone-50"
        }`}
      >
        {/* Icon with Day indicator */}
        <div className="flex items-center gap-3">
          <span className="text-4xl transition-transform duration-300 md:text-5xl">
            {daytimeIcon}
          </span>
          <Sun
            className="text-yellow-500 transition-all duration-300"
            size={20}
          />
        </div>

        {/* Day Info */}
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline gap-3">
            <span className="font-sans text-lg font-semibold text-stone-900 transition-all duration-300 md:text-xl">
              {dayNameFull}
            </span>
            <span className="font-sans text-sm text-stone-500 transition-all duration-300 md:text-base">
              {dateStr}
            </span>
          </div>
          <span className="text-base text-stone-600 transition-all duration-300 md:text-lg">
            {daytimeForecast.weatherCondition.description.text}
          </span>
        </div>

        {/* Rain Probability */}
        <div className="flex w-20 flex-col items-center gap-1">
          <Droplets
            className="text-blue-500 transition-all duration-300"
            size={20}
          />
          <span className="text-base font-semibold text-stone-800 transition-all duration-300 md:text-lg">
            {daytimeForecast.precipitation.probability.percent}%
          </span>
        </div>

        {/* Thunderstorm Probability */}
        <div className="flex w-20 flex-col items-center gap-1">
          <Zap
            className="text-yellow-500 transition-all duration-300"
            size={20}
          />
          <span className="text-base font-semibold text-stone-800 transition-all duration-300 md:text-lg">
            {daytimeForecast.thunderstormProbability}%
          </span>
        </div>

        {/* QPF (Rainfall Amount) */}
        <div className="flex w-24 items-center justify-center">
          <span className="text-base font-semibold text-stone-800 transition-all duration-300 md:text-lg">
            {daytimeForecast.precipitation.qpf.quantity} mm
          </span>
        </div>

        {/* Temperature */}
        <div className="flex w-28 items-center justify-between gap-2">
          <span className="text-2xl font-semibold text-stone-900 transition-all duration-300 md:text-2xl">
            {maxTemp}°
          </span>
          <span className="text-2xl font-normal text-stone-900 transition-all duration-300 md:text-2xl">
            {minTemp}°
          </span>
        </div>

        {/* Expand/Collapse Button with Rotating Chevron */}
        <button
          onClick={onToggle}
          className="flex w-12 cursor-pointer items-center justify-center rounded-lg p-2.5 transition-all duration-300 hover:bg-stone-200"
          aria-label={
            isExpanded ? "Hide night forecast" : "Show night forecast"
          }
        >
          <ChevronDown
            className={`text-stone-600 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : "rotate-0"
            }`}
            size={24}
          />
        </button>
      </div>

      {/* NIGHTTIME ROW - Desktop Only */}
      <div
        className={`col-span-7 hidden grid-cols-[auto_1fr_auto_auto_auto_auto_auto] items-center gap-6 overflow-hidden border-b border-blue-200 bg-blue-50/40 transition-all duration-300 ease-in-out md:grid md:gap-8 ${
          isExpanded
            ? "max-h-40 py-5 opacity-100 md:py-6"
            : "max-h-0 py-0 opacity-0"
        }`}
      >
        {/* Night Icon */}
        <div className="flex items-center gap-3">
          <span className="text-4xl transition-transform duration-300 md:text-5xl">
            {nighttimeIcon}
          </span>
          <Moon
            className="text-indigo-500 transition-all duration-300"
            size={20}
          />
        </div>

        {/* Night Info */}
        <div className="flex flex-col gap-1">
          <span className="font-sans text-lg font-semibold text-stone-700 transition-all duration-300 md:text-xl">
            Night
          </span>
          <span className="text-base text-stone-600 transition-all duration-300 md:text-lg">
            {nighttimeForecast.weatherCondition.description.text}
          </span>
        </div>

        {/* Night Rain */}
        <div className="flex w-20 flex-col items-center gap-1">
          <Droplets
            className="text-blue-500 transition-all duration-300"
            size={20}
          />
          <span className="text-base font-semibold text-stone-800 transition-all duration-300 md:text-lg">
            {nighttimeForecast.precipitation.probability.percent}%
          </span>
        </div>

        {/* Night Storm */}
        <div className="flex w-20 flex-col items-center gap-1">
          <Zap
            className="text-yellow-500 transition-all duration-300"
            size={20}
          />
          <span className="text-base font-semibold text-stone-800 transition-all duration-300 md:text-lg">
            {nighttimeForecast.thunderstormProbability}%
          </span>
        </div>

        {/* Night QPF */}
        <div className="flex w-24 items-center justify-center">
          <span className="text-base font-semibold text-stone-800 transition-all duration-300 md:text-lg">
            {nighttimeForecast.precipitation.qpf.quantity} mm
          </span>
        </div>

        {/* Empty cells */}
        <div className="w-28"></div>
        <div className="w-12"></div>
      </div>
    </>
  );
}
