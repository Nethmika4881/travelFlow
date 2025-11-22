import { SmartSplit } from "@/lib/utils";
import NavigateToGuidersButton from "@/ui/NavigateToGuidersButton";
import Topic from "@/ui/Topic";
import Underline from "@/ui/Underline";
import { Star } from "lucide-react";
function Overview({
  description,
  crowdLevel,
  bestTime,
  location,
  weekdayDescriptions,
  isOpenNow,
  userRatingCount,
  rating,
  nameOfThePlace,
  internationalPhoneNumber,
}) {
  console.log({
    description,
    crowdLevel,
    bestTime,
    location,
    weekdayDescriptions,
    isOpenNow,
    nameOfThePlace,
    internationalPhoneNumber,
  });
  return (
    <div className="relative rounded-xl bg-white px-10 py-5 shadow-sm">
      <Topic text={nameOfThePlace} />
      <OverviewDescription description={description} />

      <div className="flex items-center gap-30 py-10">
        <div>
          <OverviewReviews userRatingCount={userRatingCount} rating={rating} />
          <OverviewOpenCloseTag isOpenNow={isOpenNow} />
        </div>
        <NavigateToGuidersButton />
      </div>
      {internationalPhoneNumber && (
        <OverviewContactDetails
          internationalPhoneNumber={internationalPhoneNumber}
        />
      )}
    </div>
  );
}

export default Overview;

const OverviewDescription = function ({ description }) {
  const textArray = SmartSplit(description);
  console.log(textArray);
  return (
    <ul className="mt-5 flex flex-col gap-5 font-sans text-xl font-normal text-stone-800">
      {textArray.map((text, i) => (
        <li key={i}>{text}</li>
      ))}
    </ul>
  );
};

const OverviewReviews = function ({ userRatingCount, rating }) {
  return (
    <>
      {userRatingCount > 0 && (
        <div className="flex items-center gap-5 text-xl">
          <span className="flex items-center gap-1">
            <Star className="h-7 w-7 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{rating}</span>
          </span>
          <div className="text-gray-600">
            ({userRatingCount?.toLocaleString()}{" "}
            {userRatingCount === 1 ? "review" : "reviews"})
          </div>
        </div>
      )}
    </>
  );
};

import { Phone } from "lucide-react";

const OverviewContactDetails = function ({ internationalPhoneNumber }) {
  return (
    <div className="rounded-2xl border-2 border-stone-200 bg-white px-6 py-5 transition-all hover:border-orange-300 hover:shadow-md">
      <h2 className="mb-3 text-2xl font-semibold text-stone-800">Need Help?</h2>
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          <Phone className="text-orange-500" size={15} />
        </div>
        <div>
          <p className="text-sm font-medium text-stone-500">Call Now</p>
          <a
            href={`tel:${internationalPhoneNumber}`}
            className="text-lg font-bold text-stone-900 transition-colors hover:text-orange-600"
          >
            {internationalPhoneNumber}
          </a>
        </div>
      </div>
    </div>
  );
};
const OverviewOpenCloseTag = function ({ isOpenNow }) {
  return (
    <div
      className={`mx-auto mt-5 inline-block rounded-3xl ${isOpenNow ? "bg-green-700" : "bg-red-500"} px-4 py-1 font-medium text-white`}
    >
      {isOpenNow ? "open now" : "closed now"}
    </div>
  );
};
