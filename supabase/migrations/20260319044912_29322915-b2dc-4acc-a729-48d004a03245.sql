
-- Tithe Tech progress tracker (single row)
CREATE TABLE public.tithe_tech_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  current_cycle_count INTEGER NOT NULL DEFAULT 0,
  total_churches_served INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.tithe_tech_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access" ON public.tithe_tech_progress
  FOR SELECT TO anon, authenticated USING (true);

-- Tithe Tech recipients
CREATE TABLE public.tithe_tech_recipients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  church_name TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL DEFAULT 'OK',
  served_date DATE NOT NULL,
  testimonial TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.tithe_tech_recipients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access" ON public.tithe_tech_recipients
  FOR SELECT TO anon, authenticated USING (true);

-- Seed initial progress
INSERT INTO public.tithe_tech_progress (current_cycle_count, total_churches_served)
VALUES (7, 2);

-- Seed example recipients
INSERT INTO public.tithe_tech_recipients (church_name, city, state, served_date, testimonial)
VALUES
  ('Grace Community Church', 'Edmond', 'OK', '2025-09-15', 'Rooted Tech helped us secure our network and protect our congregation''s data. We had no idea how vulnerable we were.'),
  ('New Hope Baptist', 'Norman', 'OK', '2026-01-20', 'They explained everything in plain English. Our staff finally understands cybersecurity.');
