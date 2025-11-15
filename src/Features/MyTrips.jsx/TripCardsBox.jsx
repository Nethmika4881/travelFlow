import { useSearchParams } from "react-router-dom";
import ActiveandUpcomingTrips from "./ActiveandUpcomingTrips";
import DraftTrips from "./DraftTrips";
import PastTrips from "./PastTrips";

function TripCardsBox() {
  const [searchParams] = useSearchParams();
  const activeButtonType = searchParams.get("type") || "draft";

  return (
    <div>
      {activeButtonType === "activeandupcomming" && <ActiveandUpcomingTrips />}
      {activeButtonType === "draft" && <DraftTrips />}
      {activeButtonType === "past" && <PastTrips />}
    </div>
  );
}

export default TripCardsBox;
