function WeatherButton({ type, children, handleType, displayWeatherType }) {
  return (
    <button
      onClick={() => handleType(type)}
      className={`${
        displayWeatherType === type
          ? "bg-[#1864ab] text-white "
          : "b bg-white hover:bg-stone-100"
      } cursor-pointer rounded-[.5rem] px-4 py-2 transition-all duration-300 lg:px-35 lg:text-[1.3rem]`}
    >
      {children}
    </button>
  );
}

export default WeatherButton;
