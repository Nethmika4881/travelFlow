export const getCurrentWeather = async (location) => {
  console.log(location, "locationnnnnnnnn");
  const { latitude: lat, longitude: long } = location;
  console.log(lat, long, "latlong");
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const res = await fetch(
    `https://weather.googleapis.com/v1/currentConditions:lookup?key=${API_KEY}&location.latitude=${lat}&location.longitude=${long}`,
  );
  const resJson = await res.json();
  return resJson;
};

export const getHourlyWeather = async (location) => {
  const { latitude: lat, longitude: long } = location;

  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const res = await fetch(
    `https://weather.googleapis.com/v1/forecast/hours:lookup?key=${API_KEY}&location.latitude=${lat}&location.longitude=${long}`,
  );
  const resJson = await res.json();
  return resJson;
};

export const getDailyWeather = async (location) => {
  const { latitude: lat, longitude: long } = location;

  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const res = await fetch(
    `https://weather.googleapis.com/v1/forecast/days:lookup?key=${API_KEY}&location.latitude=${lat}&location.longitude=${long}`,
  );
  const resJson = await res.json();
  return resJson;
};
