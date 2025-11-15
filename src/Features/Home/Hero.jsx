import HeroImg from "./HeroImg";
import HeroSearch from "./HeroSearch";
import HeroTag from "./HeroTag";
import HeroText from "./HeroText";

export default function Hero() {
  return (
    <section
      className="relative w-full text-white"
      style={{ height: "calc(100vh - (var(--spacing) * 100))" }}
    >
      <HeroImg />

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-4 text-center">
        <HeroText />
        <HeroSearch />

        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <HeroTag>Temples & Culture</HeroTag>
          <HeroTag>Beaches</HeroTag>
          <HeroTag>Wildlife Safaris</HeroTag>
          <HeroTag> Tea Plantations</HeroTag>
        </div>
      </div>
    </section>
  );
}
