import DeploySection from "@/components/DeploySection";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MediaSection from "@/components/MediaSection";
import ModesSection from "@/components/ModesSection";
import OperativesSection from "@/components/OperativesSection";
import Overlays from "@/components/Overlays";
import SectionNav from "@/components/SectionNav";
import WeaponsSection from "@/components/WeaponsSection";
import CursorGlow from "@/components/motion/CursorGlow";

export default function Home() {
  return (
    <>
      <Overlays />
      <CursorGlow />
      <Header />
      <SectionNav />
      <main>
        <Hero />
        <ModesSection />
        <WeaponsSection />
        <OperativesSection />
        <MediaSection />
        <DeploySection />
      </main>
    </>
  );
}
