import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { MarqueeTicker } from '../components/MarqueeTicker';
import { DisciplinesSection } from '../components/DisciplinesSection';
import { SprintSection } from '../components/SprintSection';
import { CveSection } from '../components/CveSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { OperatingRulesSection } from '../components/OperatingRulesSection';
import { CredentialsSection } from '../components/CredentialsSection';
import { FaqContactSection } from '../components/FaqContactSection';

export const HomePage: React.FC = () => {
  return (
    <main className="w-full bg-[#000000] text-[#F4F1EE]">
      {/* [ 01 / 08 ] DISPATCH & HERO TELEMETRY */}
      <HeroSection />

      {/* CONTINUOUS TICKER MARQUEE */}
      <MarqueeTicker />

      {/* [ 02 / 08 ] CORE DISCIPLINES */}
      <DisciplinesSection />

      {/* [ 03 / 08 ] HOW WE SPRINT & AUDIT METHODOLOGY */}
      <SprintSection />

      {/* [ 04 / 08 ] VERIFIED CVE RESEARCH (NLTK) */}
      <CveSection />

      {/* [ 05 / 08 ] DEFENSIVE SYSTEMS & PRODUCTION LABS */}
      <ProjectsSection />

      {/* [ 06 / 08 ] OPERATING RULES & DEFENSIVE PRINCIPLES */}
      <OperatingRulesSection />

      {/* [ 07 / 08 ] VERIFIED CREDENTIALS & TRAJECTORY */}
      <CredentialsSection />

      {/* [ 08 / 08 ] FAQ & DIRECT CONTACT DISPATCH */}
      <FaqContactSection />
    </main>
  );
};
