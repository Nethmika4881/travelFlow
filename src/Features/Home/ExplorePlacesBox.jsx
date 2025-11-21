import { useNavigate } from "react-router-dom";
import ErrorComponent from "../../ui/ErrorComponent";
import PlaceCard from "../../ui/PlaceCard";
import Spinner from "../../ui/Spinner";
import { usePlacesList } from "@/contexts/PlacesListContext";

function ExplorePlacesBox() {
  const navigate = useNavigate();
  const { places, isLoading, isError } = usePlacesList();
  console.log(places);
  if (isError) return <ErrorComponent />;
  if (isLoading) return <Spinner />;
  const renderPlaces = places.filter((place) => place.featured === true);
  const handleClickOnViewDetailsButton = function (destinationID) {
    // handleSelectedID(destinationID);
    navigate(`/destinations/destination/${destinationID}`);
  };

  return (
    <div className="relative flex items-center justify-center pt-20 pb-30">
      <div className="xs:grid-cols-2 grid w-4/5 grid-cols-1 gap-x-13 gap-y-5 md:grid-cols-2 md:gap-y-10 lg:grid-cols-3">
        {renderPlaces.map((place) => (
          <PlaceCard
            place={place}
            key={place.id}
            handleClickOnViewDetailsButton={handleClickOnViewDetailsButton}
          />
        ))}
      </div>
    </div>
  );
}

export default ExplorePlacesBox;
