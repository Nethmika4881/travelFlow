import Underline from "@/ui/Underline";

function Overview({ description }) {
  return (
    <div className="bg-red-50">
      <h1>
        <span className="text-4xl font-semibold text-stone-800">Overview</span>
        <Underline />
      </h1>

      <p>{description}</p>
    </div>
  );
}

export default Overview;
