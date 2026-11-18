-- Supabase Schema for Mohammad Favas S Portfolio

-- 1. Profile Table
CREATE TABLE IF NOT EXISTS public.profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  specialties TEXT,
  location TEXT,
  summary TEXT NOT NULL,
  tagline TEXT,
  quote TEXT,
  contact JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE,
  title TEXT NOT NULL,
  subtitle TEXT,
  category TEXT,
  description TEXT NOT NULL,
  tech_stack TEXT[] DEFAULT '{}',
  link TEXT,
  image_url TEXT,
  display_order INT DEFAULT 0,
  published BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Writeups Table
CREATE TABLE IF NOT EXISTS public.writeups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  date DATE DEFAULT CURRENT_DATE,
  summary TEXT,
  body TEXT NOT NULL,
  cover_image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  reading_time INT DEFAULT 3,
  display_order INT DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Skills Table
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_name TEXT NOT NULL,
  items TEXT[] DEFAULT '{}',
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.writeups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Public read access for published items
CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profile FOR SELECT USING (true);

CREATE POLICY "Public projects are viewable by everyone" 
  ON public.projects FOR SELECT USING (published = true);

CREATE POLICY "Public writeups are viewable by everyone" 
  ON public.writeups FOR SELECT USING (published = true);

CREATE POLICY "Public skills are viewable by everyone" 
  ON public.skills FOR SELECT USING (true);

-- RLS Policies: Write access only for authenticated admin
CREATE POLICY "Admin full access to profile" 
  ON public.profile FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access to projects" 
  ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access to writeups" 
  ON public.writeups FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access to skills" 
  ON public.skills FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Storage bucket for images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: Public read, Authenticated upload
CREATE POLICY "Public can view portfolio images" 
  ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-images');

CREATE POLICY "Authenticated users can upload portfolio images" 
  ON storage.objects FOR INSERT TO authenticated 
  WITH CHECK (bucket_id = 'portfolio-images');
