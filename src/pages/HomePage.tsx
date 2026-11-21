import React from 'react';
import { FeaturedResearch } from '../components/FeaturedResearch';
import { HeroSection } from '../components/HeroSection';
import { MarqueeTicker } from '../components/MarqueeTicker';
import { CyberneticCoreSection } from '../components/CyberneticCoreSection';
import { StackingSprintSection } from '../components/StackingSprintSection';
import { DavidGoliathSection } from '../components/DavidGoliathSection';
import { VulnerabilityRealitySection } from '../components/VulnerabilityRealitySection';
import { InteractiveWarRoomSection } from '../components/InteractiveWarRoomSection';
import { DisciplinesSection } from '../components/DisciplinesSection';
import { CveSection } from '../components/CveSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { OperatingRulesSection } from '../components/OperatingRulesSection';
import { CredentialsSection } from '../components/CredentialsSection';
import { FullBleedCrimsonFaqSection } from '../components/FullBleedCrimsonFaqSection';

export const HomePage: React.FC = () => {
  return (
    <main className="w-full bg-[#000000] text-[#F4F1EE]">
      <HeroSection />
      <FeaturedResearch />
      <MarqueeTicker />
      <CyberneticCoreSection />
      <StackingSprintSection />
      <DavidGoliathSection />
      <VulnerabilityRealitySection />
      <InteractiveWarRoomSection />
      <DisciplinesSection />
      <CveSection />
      <ProjectsSection />
      <OperatingRulesSection />
      <CredentialsSection />
      <FullBleedCrimsonFaqSection />
    </main>
  );
};