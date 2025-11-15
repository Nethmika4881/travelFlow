import useGetPlaces from "../../hooks/useGetPlaces";
import PlaceCard from "../../ui/PlaceCard";

function ExplorePlacesBox() {
  const { places, error, isLoading, isError } = useGetPlaces();
  if (isLoading) return <p>Loading...</p>;
  console.log(places);

  const renderPlaces = places.filter((place) => place.featured === true);
  console.log(renderPlaces);
  return (
    <div className="flex items-center justify-center">
      <div className="grid w-4/5 grid-cols-1 gap-x-13 gap-y-5 bg-amber-100 sm:grid-cols-2 md:grid-cols-3">
        {renderPlaces.map((place) => (
          <PlaceCard place={place} key={place.id} />
        ))}
      </div>
    </div>
  );
}

export default ExplorePlacesBox;
