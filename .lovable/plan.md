

## Plan: Tithe Tech Section + OKC Helping Hands Badge + Landing Page Polish

### What we're building

1. **Tithe Tech Section** on the landing page with:
   - Progress ring (0-10 visual tracker) showing audits toward next free church service
   - "Wall of Blessing" grid for recipient churches
   - Database tables (`tithe_tech_progress`, `tithe_tech_recipients`) with public read RLS
   - Seed with initial data so it's not empty

2. **OKC Helping Hands Badge** — a small "Proud partner" section near the footer linking to https://okc-helping-hands.vercel.app with messaging about protecting vulnerable populations

3. **Bolder Accents** — strengthen `glow-cyan` shadows, increase divider opacity, add cyan hover borders on service cards

4. **Service Rename** — "Malware Protection" → "Ransomware Defense" with `ShieldAlert` icon, reorder services by selling power

### Files changed
- **New migration**: `tithe_tech_progress` and `tithe_tech_recipients` tables
- **`src/pages/Landing.tsx`**: Tithe Tech section, OKC HH badge, service updates, bolder accent classes
- **`src/index.css`**: Stronger glow utilities

### Database tables

**`tithe_tech_progress`** — single row: `id`, `current_cycle_count` (0-9), `total_churches_served`
- RLS: public select, no public insert/update

**`tithe_tech_recipients`** — `id`, `church_name`, `city`, `state`, `served_date`, `testimonial`, `created_at`
- RLS: public select

