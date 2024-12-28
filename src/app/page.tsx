import { ReactLenis } from "lenis/react";

import { FaqSection } from "./_components/sections/faq-section";
import { HeroSection } from "./_components/sections/hero-section";
import { InfosSection } from "./_components/sections/infos-section";
import { MainFooter } from "./_components/sections/main-footer";
import { MainNavigation } from "./_components/sections/main-navigation";
import { PricesSection } from "./_components/sections/prices-section";
import { ProfessionalsSection } from "./_components/sections/professionals-section";
import { SolutionSection } from "./_components/sections/solution-section";

export default function Home() {
  return (
    <ReactLenis root>
      <div className="w-full">
        <MainNavigation />
        <main>
          <HeroSection />
          <InfosSection />
          <SolutionSection />
          <ProfessionalsSection />
          <PricesSection />
          <FaqSection />
        </main>
        <MainFooter />
      </div>
    </ReactLenis>
  );
}
