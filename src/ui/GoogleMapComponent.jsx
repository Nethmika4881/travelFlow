import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";
import Spinner from "./Spinner";
import { useMemo } from "react";
import ErrorComponent from "./ErrorComponent";
import {
  getCurrentWeather,
  getHourlyWeather,
  getDailyWeather,
} from "@/hooks/getWeatherDetails";

function GoogleMapComponent({ center, zoom = 15 }) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const mapCenter = useMemo(() => {
    if (!center) return { lat: 0, lng: 0 };
    return {
      lat: center.latitude || center.lat || 0,
      lng: center.longitude || center.lng || 0,
    };
  }, [center]);
  getCurrentWeather({ lat: center.latitude, long: center.longitude });
  getHourlyWeather({ lat: center.latitude, long: center.longitude });
  getDailyWeather({ lat: center.latitude, long: center.longitude });
  if (loadError) return <ErrorComponent />;
  if (!isLoaded) return <Spinner />;

  if (!center || (mapCenter.lat === 0 && mapCenter.lng === 0)) {
    return <div>Location not available</div>;
  }

  return (
    <div className="h-96 w-full md:h-[500px] lg:h-[400px]">
      {/* Responsive container */}
      <GoogleMap
        center={mapCenter}
        zoom={zoom}
        mapContainerStyle={{
          width: "100%",
          height: "100%", // Now 100% of the parent div
        }}
      />
    </div>
  );
}
export default GoogleMapComponent;
