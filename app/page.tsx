import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ModesSection from "@/components/ModesSection";
import Overlays from "@/components/Overlays";
import SectionNav from "@/components/SectionNav";

export default function Home() {
  return (
    <>
      <Overlays />
      <Header />
      <SectionNav />
      <main>
        <Hero />
        <ModesSection />
      </main>
    </>
  );
}
