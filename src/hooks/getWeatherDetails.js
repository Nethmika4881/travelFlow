export const getCurrentWeather = async (location) => {
  const { lat, long } = location;
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const res = await fetch(
    `https://weather.googleapis.com/v1/currentConditions:lookup?key=${API_KEY}&location.latitude=${lat}&location.longitude=${long}`,
  );
  const resJson = await res.json();
  console.log(resJson);
};

export const getHourlyWeather = async (location) => {
  const { lat, long } = location;
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const res = await fetch(
    `https://weather.googleapis.com/v1/forecast/hours:lookup?key=${API_KEY}&location.latitude=${lat}&location.longitude=${long}`,
  );
  const resJson = await res.json();
  console.log(resJson);
  a;
};

export const getDailyWeather = async (location) => {
  const { lat, long } = location;
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const res = await fetch(
    `https://weather.googleapis.com/v1/forecast/days:lookup?key=${API_KEY}&location.latitude=${lat}&location.longitude=${long}`,
  );
  const resJson = await res.json();
  console.log(resJson);
};
