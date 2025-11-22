import Spinner from "../ui/Spinner";
import ErrorComponent from "../ui/ErrorComponent";
import ImageSlider from "../Features/DestinationDetails/ImageSlider";
import Overview from "@/Features/DestinationDetails/Overview";
import DestinationDetailsTopic from "@/Features/DestinationDetails/DestinationDetailsTopic";
import GoogleReviewsDisplay from "@/Features/DestinationDetails/GoogleReviewsDisplay";
import { supabase } from "../../supabase";
import { getSelectedObj } from "@/hooks/getSelectedObj";
import { useLoaderData, useNavigation } from "react-router-dom";
import GoogleMapComponent from "@/ui/GoogleMapComponent";
import Topic from "@/ui/Topic";
import PopularActivitiesComponent from "@/ui/PopularActivitiesComponent";
import DisplayWeatherDetails from "@/components/DisplayWeatherDetails";
export default function DestinationDetails() {
  const { destination, placesApiData, isError } = useLoaderData();
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorComponent />;
  if (!destination) return <div>Destination not found</div>;

  // Destructure Google Places API data
  const {
    id: googlePlaceID = null,
    displayName = {},
    location = {},
    photos: gallery = [],
    rating = null,
    regularOpeningHours = {},
    reviews = [],
    userRatingCount = null,
    internationalPhoneNumber,
  } = placesApiData || {};

  // Extract nested values
  const name = displayName?.text || "Unknown Destination";
  const weekdayDescriptions = regularOpeningHours?.weekdayDescriptions || [];
  const isOpenNow = regularOpeningHours?.openNow || false;

  // Get data from your database (destination object)
  const {
    main_image_url: mainImage = "/placeholder.jpg",
    crowd_percentage: crowdLevel = 0,
    best_time_to_visit: bestTime = "Year-round",
    // category = "General",
    popular_activities: popularActivities,
    description,
    google_place_id,
  } = destination || {};

  console.log("Destination:", destination);
  console.log("Places API Data:", placesApiData);
  console.log({ reviews, rating, userRatingCount });
  return (
    <div className="min-h-screen w-full gap-10 bg-stone-50 px-6 py-8 md:px-18 lg:grid lg:grid-cols-[3fr_2fr] lg:grid-rows-[auto_auto_1fr] lg:px-10">
      <DestinationDetailsTopic />
      <ImageSlider mainImage={mainImage} gallery={gallery} />
      <Overview
        id={google_place_id || googlePlaceID}
        nameOfThePlace={name}
        description={description}
        crowdLevel={crowdLevel}
        bestTime={bestTime}
        location={location}
        weekdayDescriptions={weekdayDescriptions}
        isOpenNow={isOpenNow}
        userRatingCount={userRatingCount}
        rating={rating}
        internationalPhoneNumber={internationalPhoneNumber}
      />

      <DisplayWeatherDetails location={location} />

      <div className="mt-10 space-y-15 py-10 lg:row-span-2 lg:flex lg:flex-col lg:gap-10">
        <div className="flex flex-col gap-10">
          <Topic text="Main Map" />
          <GoogleMapComponent center={location} zoom={8} />
        </div>

        <div className="mt-10 flex flex-col gap-10 py-10">
          <Topic text="Site Map" />
          <GoogleMapComponent center={location} zoom={15} />
        </div>
        <PopularActivitiesComponent popularActivities={popularActivities} />
      </div>
      <GoogleReviewsDisplay placeData={placesApiData} />
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const loaderDestinationData = async ({ params }) => {
  try {
    const selectedPlaceObject = await getSelectedObj(params.destinationID);
    // console.log("Calling live function...");

    const { data, error } = await supabase.functions.invoke("places-api", {
      body: { place_id: selectedPlaceObject.google_place_id },
    });

    if (error) {
      console.error("Supabase function error:", error);
      return {
        destination: selectedPlaceObject,
        placesApiData: null,
        isError: true,
      };
    }

    return {
      destination: selectedPlaceObject, // This has all destination data that i stored in the supabase
      placesApiData: data, // This has Google Places API data
      isError: false,
    };
  } catch (error) {
    console.error("Loader error:", error);
    return {
      destination: null,
      placesApiData: null,
      isError: true,
    };
  }
};
