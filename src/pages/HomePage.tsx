import React, { useEffect, useState } from 'react';
import { HeroSection } from '../components/HeroSection';
import { MarqueeTicker } from '../components/MarqueeTicker';
import { CveSection } from '../components/CveSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { WriteupsSection } from '../components/WriteupsSection';
import { TimelineSection } from '../components/TimelineSection';
import { CertificatesSection } from '../components/CertificatesSection';
import { SkillsSection } from '../components/SkillsSection';
import { ContactSection } from '../components/ContactSection';
import { 
  getProfile, 
  getProjects, 
  getWriteups, 
  getCves, 
  getCertifications, 
  getTimeline, 
  getSkills 
} from '../lib/supabase';
import { Profile, Project, Writeup, CveItem, Certification, TimelineEntry, SkillGroup } from '../types/portfolio';
import { 
  initialProfile, 
  initialProjects, 
  initialWriteups, 
  initialCves, 
  initialCertifications, 
  initialTimeline, 
  initialSkills 
} from '../data/portfolioData';

export const HomePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [writeups, setWriteups] = useState<Writeup[]>(initialWriteups);
  const [cves, setCves] = useState<CveItem[]>(initialCves);
  const [certifications, setCertifications] = useState<Certification[]>(initialCertifications);
  const [timeline, setTimeline] = useState<TimelineEntry[]>(initialTimeline);
  const [skills, setSkills] = useState<SkillGroup[]>(initialSkills);

  useEffect(() => {
    // Attempt live Supabase load if available, falls back safely
    getProfile().then(setProfile);
    getProjects().then(setProjects);
    getWriteups().then(setWriteups);
    getCves().then(setCves);
    getCertifications().then(setCertifications);
    getTimeline().then(setTimeline);
    getSkills().then(setSkills);
  }, []);

  return (
    <main>
      <HeroSection profile={profile} />
      <MarqueeTicker />
      <CveSection cves={cves} />
      <ProjectsSection projects={projects} />
      <WriteupsSection writeups={writeups} limit={4} />
      <SkillsSection skills={skills} />
      <TimelineSection entries={timeline} />
      <CertificatesSection certifications={certifications} />
      <ContactSection profile={profile} />
    </main>
  );
};
