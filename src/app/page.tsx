import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { JourneyTimeline } from "@/components/home/JourneyTimeline";
import { profile } from "../../content/data/profile";
import { journey } from "../../content/data/journey";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection profile={profile} />
      <JourneyTimeline journey={journey} />
    </>
  );
}
