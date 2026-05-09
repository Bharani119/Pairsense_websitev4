import Hero from "@/components/sections/Hero";
import Flavours from "@/components/sections/Flavours";
import InnovationLoop from "@/components/sections/InnovationLoop";
import Process from "@/components/sections/Process";
import WhoWeAre from "@/components/sections/WhoWeAre";
import About from "@/components/sections/About";
import Capabilities from "@/components/sections/Capabilities";
import Segments from "@/components/sections/Segments";
import CategoryStrip from "@/components/sections/CategoryStrip";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Page() {
  return (
    <>
      <Hero />
      <Flavours />
      <About />
      <InnovationLoop />
      <WhoWeAre />
      <Capabilities />
      <Process />
      <Segments />
      <CategoryStrip />
      <Contact />
      <Footer />
    </>
  );
}
