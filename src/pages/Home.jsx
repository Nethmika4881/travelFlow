import { Link } from "react-router-dom";
import Hero from "../Features/Home/Hero";
import Features from "../Features/Home/Features";
import Explore from "../Features/Home/Explore";

function Home() {
  return (
    <div className="bg-stone-50">
      <Hero />
      <Features />
      <Explore />
    </div>
  );
}

export default Home;
