import { useNavigate } from "react-router-dom";

function NavigateToGuidersButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/guiders")}
      className="cursor-pointer rounded-full bg-[#EE5B2B] px-12 py-6 text-xl font-semibold text-white shadow-md transition-colors duration-300 hover:bg-[#d94f23] hover:shadow-lg"
    >
      Book a Guide
    </button>
  );
}

export default NavigateToGuidersButton;
