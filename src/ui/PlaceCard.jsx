import { MapPin } from "lucide-react";
import SecondaryButton from "./SecondaryButton";
import PrimaryButton from "./PrimaryButton";

function PlaceCard({ place, handleClickOnViewDetailsButton }) {
  const {
    id,
    name,
    main_image_url: mainImage,
    short_description: shortDescription,
    location: city,
    price,
    province,
    crowd_level: crowdLevel,
    crowd_percentage: crowdPercentage,
  } = place;
  console.log(mainImage);
  return (
    <div className="min-h-100 overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <img src={mainImage} />
      <div className="mt-5 flex flex-col gap-1.5 px-8 py-8">
        {/* title */}
        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl lg:text-3xl lg:font-semibold">
          {name}
        </h2>

        {/* location */}
        <div className="mb-3 flex items-center gap-1.5 text-gray-500">
          <MapPin color="#ff6900" size={14} className="shrink-0" />
          <span className="text-[1.3rem]">
            {city}, {province}
          </span>
        </div>

        {/* description */}
        <p className="mt-1 text-[1.3rem] leading-relaxed text-gray-600">
          {shortDescription}
        </p>

        {/* price and crowd Level */}
        <div className="my-3 flex items-center justify-between text-xl">
          {/* price */}
          <div className="flex items-center gap-1">
            <span className="font-semibold">$</span>
            <span className="font-semibold">{price}</span>
          </div>

          {/* crowd level */}
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span className="text-gray-600">
              {crowdLevel}
              <span>({crowdPercentage}%)</span>
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-5">
          <SecondaryButton onClick={() => handleClickOnViewDetailsButton(id)}>
            View Details
          </SecondaryButton>
          <PrimaryButton to="mytrips"> Add to Trip</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default PlaceCard;
