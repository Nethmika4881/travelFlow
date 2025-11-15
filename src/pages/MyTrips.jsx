import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import ButtonRow from "../Features/MyTrips.jsx/ButtonRow";
import TripCardsBox from "../Features/MyTrips.jsx/TripCardsBox";

function MyTrips() {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type");

  useEffect(() => {
    if (!type) {
      setSearchParams({ type: "draft" });
    }
  }, [type, setSearchParams]);

  return (
    <div>
      <ButtonRow />
      <TripCardsBox type={type} />
    </div>
  );
}

export default MyTrips;
