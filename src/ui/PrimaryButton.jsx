function PrimaryButton({ children, onClick }) {
  const handleClick = () => {
    onClick();
  };

  return (
    <button
      className="w-64 cursor-pointer overflow-hidden rounded-xl bg-orange-500 bg-linear-to-r px-10 py-3.5 text-xl font-semibold text-white shadow-lg transition-all duration-300 hover:bg-orange-600"
      onClick={handleClick}
    >
      <span className="relative z-10 whitespace-nowrap">{children}</span>
    </button>
  );
}
export default PrimaryButton;
