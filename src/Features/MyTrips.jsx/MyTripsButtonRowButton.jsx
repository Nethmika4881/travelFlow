import { useSearchParams } from "react-router-dom";

function MyTripsButtonRowButton({ type, children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeButtonType = searchParams.get("type");

  const handleType = function (activeTripType) {
    setSearchParams({ type: activeTripType });
  };

  return (
    <button
      onClick={() => handleType(type)}
      className={`${
        activeButtonType === type ? "bg-amber-700" : ""
      } bg-amber-50`}
    >
      {children}
    </button>
  );
}

export default MyTripsButtonRowButton;
