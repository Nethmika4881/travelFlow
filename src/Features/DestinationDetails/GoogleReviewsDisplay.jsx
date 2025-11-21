import React, { useState } from "react";
import {
  Star,
  User,
  Calendar,
  MapPin,
  Loader2,
  ExternalLink,
} from "lucide-react"; // Added Loader2 icon
// 1. IMPORT THE CUSTOM HOOK (Assuming the hook file is accessible at this path)
import { useProfilePhotoProxy } from "./../../hooks/useProfilePhoto";

// --- ReviewCard Component (Extracted for clarity and hook usage) ---

const ReviewCard = ({ review, renderStars }) => {
  // 2. USE THE CUSTOM HOOK
  const rawPhotoUri = review.authorAttribution?.photoUri;
  const { proxyUrl, isLoading, error } = useProfilePhotoProxy(rawPhotoUri);

  const displayName = review.authorAttribution?.displayName || "Anonymous";
  const authorUri = review.authorAttribution?.uri || review.googleMapsUri;
  const reviewText =
    review.text?.text || review.originalText?.text || "No review text";

  // 3. Render the Avatar based on the hook state
  const renderAvatar = () => {
    if (error) {
      // Show a simple fallback or error state if the proxy failed
      return (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-400 font-sans">
          <User className="h-6 w-6 text-white" />
        </div>
      );
    }

    if (isLoading) {
      // Show loading state while the hook generates the URL
      return (
        <div className="h-12 w-12 animate-pulse rounded-full bg-gray-300"></div>
      );
    }

    if (proxyUrl) {
      // Success: Use the secure proxy URL
      return (
        <img
          src={proxyUrl}
          alt={displayName}
          className="h-12 w-12 rounded-full object-cover"
        />
      );
    }

    // Fallback for when the review has no photoUri provided by Google
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-blue-400 to-indigo-500">
        <User className="h-6 w-6 text-white" />
      </div>
    );
  };

  return (
    <div
      key={review.name}
      className="rounded-xl bg-white p-10 shadow-md transition-shadow duration-300 hover:shadow-xl"
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="shrink-0">{renderAvatar()}</div>

        {/* Review Content */}
        <div className="flex-1">
          <div className="mb-2 flex items-start justify-between">
            <div>
              <a
                href={authorUri}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-semibold text-gray-900 transition-colors hover:text-blue-600"
              >
                {displayName}
              </a>
              <div className="mt-1 flex items-center gap-2">
                <div className="flex gap-1">{renderStars(review.rating)}</div>
                <span className="flex items-center gap-1 font-sans text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  {review.relativePublishTimeDescription}
                </span>
              </div>
            </div>
          </div>
          <p className="mt-5 font-sans text-xl leading-relaxed font-normal text-gray-700">
            {reviewText}
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---

const GoogleReviewsDisplay = ({ placeData }) => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Extract data from the API response
  const reviews = placeData?.reviews || [];
  const rating = placeData?.rating || 0;
  // const userRatingCount = placeData?.userRatingCount || 0;
  // const placeName = placeData?.displayName?.text || "Location";

  const calculateAverageRating = () => {
    if (reviews.length === 0) return "0.0";
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      // Ensure rating is an integer key
      if (review.rating in distribution) {
        distribution[review.rating]++;
      }
    });
    return distribution;
  };

  const filteredReviews =
    selectedFilter === "all"
      ? reviews
      : reviews.filter((review) => review.rating === parseInt(selectedFilter));

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating
            ? "fill-orange-500 text-orange-500"
            : "fill-gray-200 text-gray-200"
        }`}
      />
    ));
  };

  const distribution = getRatingDistribution();
  const avgRating = rating || calculateAverageRating();

  return (
    <div className="row-span-2 min-h-screen bg-linear-to-br p-4 font-sans md:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Header and Summary (Unchanged) */}
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-lg md:p-8">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Average Rating */}
            <div className="flex flex-col items-center justify-center rounded-xl bg-stone-100 p-6">
              <div className="mb-2 text-6xl font-bold text-gray-900">
                {avgRating}
              </div>
              <div className="mb-2 flex gap-1">
                {renderStars(Math.round(parseFloat(avgRating)))}
              </div>
              <p className="text-sm text-gray-600">
                Based on {placeData?.userRatingCount?.toLocaleString()} reviews
              </p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-3">
                  <span className="w-8 text-sm font-medium text-gray-700">
                    {star} ★
                  </span>
                  <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-orange-500 to-orange-500 transition-all duration-500"
                      style={{
                        width: `${reviews.length > 0 ? (distribution[star] / reviews.length) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  <span className="w-8 text-sm text-gray-600">
                    {distribution[star]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`rounded-lg px-4 py-2 font-medium transition-all ${
                selectedFilter === "all"
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Reviews
            </button>
            {[5, 4, 3, 2, 1].map((ratingFilter) => (
              <button
                key={ratingFilter}
                onClick={() => setSelectedFilter(ratingFilter.toString())}
                className={`rounded-lg px-4 py-2 font-medium transition-all ${
                  selectedFilter === ratingFilter.toString()
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {ratingFilter} Stars
              </button>
            ))}
            {placeData?.userRatingCount > 0 && (
              <ShowMoreReviewsButton placeData={placeData} />
            )}
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {/* RENDER THE EXTRACTED COMPONENT */}
          {filteredReviews.map((review, index) => (
            <ReviewCard
              key={review.name || index}
              review={review}
              renderStars={renderStars}
            />
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="rounded-xl bg-white p-12 text-center shadow-md">
            <p className="text-lg text-gray-500">
              No reviews found for this rating.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleReviewsDisplay;

const ShowMoreReviewsButton = ({ placeData }) => {
  const mapsUrl = `https://www.google.com/maps/place/?q=place_id:${placeData.id}`;

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="ml-auto inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#EE5B2B] px-6 py-3 font-medium text-white shadow-lg transition-all hover:bg-[#d94f23] hover:shadow-lg"
    >
      View All {placeData?.userRatingCount?.toLocaleString()} Reviews
      <ExternalLink className="h-5 w-5" />
    </a>
  );
};
