import React from 'react';
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
      {/* [ 01 / 09 ] HERO EDITORIAL HEADLINE & TELEMETRY */}
      <HeroSection />

      {/* CONTINUOUS BRAND & TARGET MARQUEE */}
      <MarqueeTicker />

      {/* [ 02 / 09 ] FULL-WIDTH 3D INTERACTIVE CYBERNETIC CORE (STANDALONE SECTION) */}
      <CyberneticCoreSection />

      {/* [ 03 / 09 ] HORIZONTAL STACKING SPRINT CARDS (HONEY SCREENSHOT 2 STYLE) */}
      <StackingSprintSection />

      {/* [ 04 / 09 ] EDITORIAL FEATURE & CONCENTRIC ARTWORK FRAME (HONEY SCREENSHOT 3 STYLE) */}
      <DavidGoliathSection />

      {/* [ 05 / 09 ] SCROLL-DRIVEN REVEAL & FLOATING FROSTED CARDS (HONEY SCREENSHOTS 4 & 5 STYLE) */}
      <VulnerabilityRealitySection />

      {/* [ 06 / 09 ] INTERACTIVE PHASE WAR ROOM & FINE ART (HONEY SCREENSHOT 6 STYLE) */}
      <InteractiveWarRoomSection />

      {/* CORE DISCIPLINES & CAPABILITIES (2x2 BALANCED ARCHITECTURAL GRID) */}
      <DisciplinesSection />

      {/* [ 07 / 09 ] DISCLOSED CVE RESEARCH & CODE COMPARISON (NLTK) */}
      <CveSection />

      {/* [ 08 / 09 ] DEFENSIVE SYSTEMS & PRODUCTION REPOSITORIES */}
      <ProjectsSection />

      {/* NON-NEGOTIABLE OPERATING RULES (HONEY POOL RULES STYLE) */}
      <OperatingRulesSection />

      {/* VERIFIED CREDENTIALS & TRAJECTORY (4-COL MATRIX + TIMELINE) */}
      <CredentialsSection />

      {/* [ 09 / 09 ] FULL-BLEED CRIMSON RED CURVED FAQ SHEET (HONEY SCREENSHOT 7 STYLE) */}
      <FullBleedCrimsonFaqSection />
    </main>
  );
};