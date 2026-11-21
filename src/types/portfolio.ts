export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  techStack: string[];
  link: string;
  image?: string;
  displayOrder: number;
  published: boolean;
  featured?: boolean;
}

export interface Writeup {
  id: string;
  slug: string;
  title: string;
  date: string;
  summary: string;
  body: string;
  coverImage?: string;
  tags: string[];
  readingTime?: number;
  displayOrder: number;
  published: boolean;
}

export interface CveItem {
  id: string;
  title: string;
  cveId: string;
  weakness: string;
  rating: string;
  affected: string;
  status: string;
  summary: string;
  contribution: string;
  prLink: string;
  advisoryLink?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  evidence: string;
  date: string;
  image?: string;
}

export interface TimelineEntry {
  id: string;
  period: string;
  title: string;
  role: string;
  description: string;
  category: 'experience' | 'education';
}

export interface SkillGroup {
  id: string;
  title: string;
  items: string[];
}

export interface Profile {
  name: string;
  role: string;
  specialties: string;
  location: string;
  summary: string;
  tagline: string;
  quote: string;
  contact: {
    email: string;
    github: string;
    linkedin: string;
    tryhackme: string;
    telegram: string;
    x: string;
    instagram?: string;
  };
}
