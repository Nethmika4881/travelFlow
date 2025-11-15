function FeatureCard({ children, topic, description }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white px-10 py-15 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="mb-15 flex h-35 w-35 items-center justify-center rounded-full bg-linear-to-br from-orange-50 to-red-50 transition-transform duration-300 hover:scale-110">
        {children}
      </div>
      <h1 className="mb-5 text-4xl font-semibold text-stone-800">{topic}</h1>
      <p className="text-[1.4rem] font-normal text-gray-600">{description}</p>
    </div>
  );
}

export default FeatureCard;
