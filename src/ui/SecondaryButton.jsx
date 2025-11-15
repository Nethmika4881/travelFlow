function SecondaryButton({ children, onClick }) {
  const handleClick = () => {
    onClick();
  };

  return (
    <button
      className="group relative flex w-64 cursor-pointer items-center justify-center gap-2.5 overflow-hidden rounded-xl border-2 border-gray-300 bg-white px-10 py-3.5 text-xl font-semibold text-stone-800 shadow-md transition-all duration-300 hover:border-orange-500 hover:shadow-lg"
      onClick={handleClick}
    >
      <span className="relative z-10 whitespace-nowrap">{children}</span>
      <span className="relative z-10 text-lg transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </button>
  );
}

export default SecondaryButton;
