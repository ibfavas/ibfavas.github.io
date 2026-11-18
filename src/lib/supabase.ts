import { createClient } from '@supabase/supabase-js';
import { initialProfile, initialProjects, initialWriteups, initialSkills, initialCertifications, initialTimeline, initialCves } from '../data/portfolioData';
import { Project, Writeup, SkillGroup, Profile, Certification, TimelineEntry, CveItem } from '../types/portfolio';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// Safe data fetching functions with fallback
export async function getProfile(): Promise<Profile> {
  if (!supabase) return initialProfile;
  try {
    const { data, error } = await supabase.from('profile').select('*').limit(1).single();
    if (error || !data) return initialProfile;
    return {
      name: data.name || initialProfile.name,
      role: data.role || initialProfile.role,
      specialties: data.specialties || initialProfile.specialties,
      location: data.location || initialProfile.location,
      summary: data.summary || initialProfile.summary,
      tagline: data.tagline || initialProfile.tagline,
      quote: data.quote || initialProfile.quote,
      contact: data.contact || initialProfile.contact,
    };
  } catch {
    return initialProfile;
  }
}

export async function getProjects(): Promise<Project[]> {
  if (!supabase) return initialProjects;
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('published', true)
      .order('display_order', { ascending: true });
    if (error || !data || data.length === 0) return initialProjects;
    return data.map((d: any) => ({
      id: d.id,
      title: d.title,
      subtitle: d.subtitle || '',
      category: d.category || 'Engineering',
      description: d.description || '',
      techStack: d.tech_stack || [],
      link: d.link || '',
      image: d.image_url || undefined,
      displayOrder: d.display_order || 0,
      published: d.published ?? true,
      featured: d.featured ?? false,
    }));
  } catch {
    return initialProjects;
  }
}

export async function getWriteups(): Promise<Writeup[]> {
  if (!supabase) return initialWriteups;
  try {
    const { data, error } = await supabase
      .from('writeups')
      .select('*')
      .eq('published', true)
      .order('display_order', { ascending: true });
    if (error || !data || data.length === 0) return initialWriteups;
    return data.map((d: any) => ({
      id: d.id,
      slug: d.slug,
      title: d.title,
      date: d.date || d.created_at?.split('T')[0] || '2026-09-29',
      summary: d.summary || '',
      body: d.body || '',
      coverImage: d.cover_image_url || undefined,
      tags: d.tags || [],
      readingTime: d.reading_time || Math.ceil((d.body || '').split(/\s+/).length / 200),
      displayOrder: d.display_order || 0,
      published: d.published ?? true,
    }));
  } catch {
    return initialWriteups;
  }
}

export async function getWriteupBySlug(slug: string): Promise<Writeup | undefined> {
  const all = await getWriteups();
  return all.find(w => w.slug === slug);
}

export async function getSkills(): Promise<SkillGroup[]> {
  return initialSkills;
}

export async function getCertifications(): Promise<Certification[]> {
  return initialCertifications;
}

export async function getTimeline(): Promise<TimelineEntry[]> {
  return initialTimeline;
}

export async function getCves(): Promise<CveItem[]> {
  return initialCves;
}
