import { MapPin } from "lucide-react";

function PlaceCard({ place }) {
  const {
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
    <div className="min-h-100 overflow-hidden rounded-2xl bg-amber-50">
      <img src={mainImage} />
      <div className="flex flex-col gap-1.5 px-6 py-4">
        {/* title */}
        <h2 className="text-xl leading-tight font-semibold text-gray-900">
          {name}
        </h2>

        {/* location */}
        <div className="flex items-center gap-1.5 text-gray-600">
          <MapPin color="#ff6900" size={16} className="shrink-0" />
          <span className="text-sm">
            {city}, {province}
          </span>
        </div>

        {/* description */}
        <p className="mt-1 text-sm leading-relaxed text-gray-600">
          {shortDescription}
        </p>

        {/* price and crowd Level */}
        <div className="mt-2 flex items-center justify-between">
          {/* price */}
          <div className="flex items-center gap-1">
            <span className="text-lg font-semibold text-gray-900">$</span>
            <span className="text-lg font-semibold text-gray-900">{price}</span>
          </div>

          {/* crowd level */}
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-700">
              {crowdLevel}
              <span className="text-gray-500">({crowdPercentage}%)</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceCard;
