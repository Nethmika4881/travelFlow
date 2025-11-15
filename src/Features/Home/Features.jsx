import { User, Compass, Blocks } from "lucide-react";
import FeatureCard from "./FeatureCard";
import FeaturePrimaryText from "./FeaturePrimaryText";

function Features() {
  return (
    <section className="flex items-center justify-center py-10">
      <div className="w-4/5 py-20 text-center">
        <FeaturePrimaryText />
        <div className="mt-20 grid grid-cols-1 gap-20 md:grid-cols-3">
          <FeatureCard
            topic="Choose Your Interests"
            description="Select from temples, beaches, wildlife, or tea plantations to customize your journey"
          >
            <Blocks size={60} color="#ff6900" />
          </FeatureCard>
          <FeatureCard
            topic="Explore Destinations"
            description="Discover hidden gems and popular attractions tailored to your preferences"
          >
            <Compass size={60} color="#ff6900" />
          </FeatureCard>
          <FeatureCard
            topic="Find Tourist Guider"
            description="Connect with experienced local guides who know the best spots and stories"
          >
            <User size={60} color="#ff6900" />
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}

export default Features;
