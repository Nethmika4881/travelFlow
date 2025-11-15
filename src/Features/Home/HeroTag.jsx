function HeroTag({ children }) {
  return (
    <button className="rounded-lg bg-black/50 px-4 py-2 text-white backdrop-blur-sm hover:bg-black/70">
      {children}
    </button>
  );
}

export default HeroTag;
