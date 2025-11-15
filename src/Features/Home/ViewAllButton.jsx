import { useNavigate } from "react-router-dom";

function ViewAllButton() {
  const navigate = useNavigate();

  return (
    <button
      className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 bg-white px-10 py-3 text-xl font-medium whitespace-nowrap text-stone-800 shadow-sm transition-all duration-300 hover:bg-gray-50"
      onClick={() => navigate("/explore")}
    >
      View All
      <span className="text-lg">→</span>
    </button>
  );
}

export default ViewAllButton;
