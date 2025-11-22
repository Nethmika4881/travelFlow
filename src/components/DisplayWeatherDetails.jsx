import Topic from "@/ui/Topic";
import WeatherButtonRow from "@/ui/WeatherButtonRow";
import WeatherCardBox from "@/ui/WeatherCardBox";
import { useState } from "react";

function DisplayWeatherDetails({ location }) {
  const [displayWeatherType, setDisplayWeatherType] = useState("current");
  const handleType = function (activeWeatherType) {
    setDisplayWeatherType(activeWeatherType);
  };
  return (
    <div className="min-h-100 rounded-xl bg-white p-4 shadow-sm md:px-10 md:py-8 lg:row-span-1">
      <Topic text="Weather Details" />
      <WeatherButtonRow
        displayWeatherType={displayWeatherType}
        handleType={handleType}
      />
      <WeatherCardBox
        location={location}
        displayWeatherType={displayWeatherType}
      />
    </div>
  );
}

export default DisplayWeatherDetails;
