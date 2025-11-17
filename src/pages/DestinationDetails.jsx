import { useParams } from "react-router-dom";
import useGetPlace from "../hooks/useGetPlace";
import Spinner from "../ui/Spinner";
import ErrorComponent from "../ui/ErrorComponent";
import ImageSlider from "../Features/DestinationDetails/ImageSlider";
import Overview from "@/Features/DestinationDetails/Overview";
import Underline from "@/ui/Underline";
import DestinationDetailsTopic from "@/Features/DestinationDetails/DestinationDetailsTopic";

export default function DestinationDetails() {
  const { destinationID } = useParams();
  const {
    place: destination,
    error,
    isLoading,
    isError,
  } = useGetPlace(destinationID);

  if (!destinationID) return <ErrorComponent />;

  if (isLoading) return <Spinner />;
  if (!isLoading && isError) <ErrorComponent />;
  const {
    id,
    name,
    description,
    category,
    main_image_url: mainImage,
    gallery_images: gallery,
    popular_activities: activities,
    crowd_percentage: crowdLevel,
    best_time_to_visit: bestTime,
    short_description: shortDesc,
  } = destination;
  console.log(destinationID);
  console.log(destination);
  return (
    <div className="min-h-screen w-full gap-10 bg-blue-50 px-6 py-8 md:px-18 lg:grid lg:grid-cols-[3fr_2fr] lg:grid-rows-[auto_1fr] lg:px-10">
      <DestinationDetailsTopic />
      <ImageSlider />
      <Overview description={description} />
    </div>
  );
}
