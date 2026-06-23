import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ModesSection from "@/components/ModesSection";
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
      </main>
    </>
  );
}
