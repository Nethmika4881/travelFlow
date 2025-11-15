import SecondaryButton from "../../ui/SecondaryButton";

function ExploreHeading() {
  return (
    <section className="flex items-center justify-center bg-stone-50 py-16">
      <div className="w-4/5">
        <div className="mb-3 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-stone-800 sm:text-5xl">
            Popular Destinations
          </h1>
          <SecondaryButton to="explore">View All</SecondaryButton>
        </div>
        <p className="text-xl font-light text-gray-600 sm:text-2xl">
          Discover Sri Lanka's most beloved attractions
        </p>
      </div>
    </section>
  );
}

export default ExploreHeading;
