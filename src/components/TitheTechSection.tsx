/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  TITHE TECH SECTION — Community Giveback Tracker               ║
 * ╠══════════════════════════════════════════════════════════════════╣
 * ║  CONCEPT:                                                      ║
 * ║  For every 10 paid security audits Rooted Tech completes,      ║
 * ║  we donate 1 full audit + network optimization to a local      ║
 * ║  church or nonprofit — completely free.                        ║
 * ╠══════════════════════════════════════════════════════════════════╣
 * ║  DATA SOURCE (Supabase / Lovable Cloud):                       ║
 * ║  - tithe_tech_progress: single row tracking cycle count        ║
 * ║    • current_cycle_count (0-9): audits toward next free one    ║
 * ║    • total_churches_served: lifetime count of churches helped  ║
 * ║  - tithe_tech_recipients: list of churches that received       ║
 * ║    free audits, with optional testimonials                     ║
 * ║    • church_name, city, state, served_date, testimonial        ║
 * ╠══════════════════════════════════════════════════════════════════╣
 * ║  VISUAL COMPONENTS:                                            ║
 * ║  1. ProgressRing — SVG donut chart (0-10 scale)                ║
 * ║     Shows how close we are to the next free church audit       ║
 * ║  2. Stats — Total churches served + total audits completed     ║
 * ║  3. "Wall of Blessing" — Grid of recipient church cards        ║
 * ║     Each card shows church name, city, date, and testimonial   ║
 * ║  4. "Nominate them" link — scrolls to #contact section         ║
 * ╠══════════════════════════════════════════════════════════════════╣
 * ║  TO UPDATE PROGRESS:                                           ║
 * ║  Update the tithe_tech_progress table in the database.         ║
 * ║  When current_cycle_count reaches 10:                          ║
 * ║    1. Reset current_cycle_count to 0                           ║
 * ║    2. Increment total_churches_served by 1                     ║
 * ║    3. Add new row to tithe_tech_recipients                     ║
 * ╠══════════════════════════════════════════════════════════════════╣
 * ║  RLS POLICIES:                                                 ║
 * ║  - Both tables have public SELECT (anyone can view progress)   ║
 * ║  - No public INSERT/UPDATE (admin-only via dashboard/direct)   ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Church, Heart, Quote } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

/** Shape of the single-row progress tracker */
interface TitheTechProgress {
  current_cycle_count: number;   // 0-9: audits completed in current cycle
  total_churches_served: number; // lifetime churches served
}

/** Shape of each recipient church record */
interface TitheTechRecipient {
  id: string;
  church_name: string;
  city: string;
  state: string;
  served_date: string;
  testimonial: string | null;
}

/**
 * ProgressRing — SVG circular progress indicator
 * @param count - Current progress value (0-10)
 * @param total - Maximum value (default 10)
 *
 * Uses two overlapping SVG circles:
 *   1. Background circle (muted color)
 *   2. Foreground circle (primary color) with strokeDashoffset animation
 * The foreground circle's dash offset shrinks as count increases,
 * creating a filling ring effect. Glow effect via drop-shadow filter.
 */
const ProgressRing = ({ count, total = 10 }: { count: number; total?: number }) => {
  const radius = 70;
  const stroke = 8;
  const normalizedRadius = radius - stroke;
  const circumference = normalizedRadius * 2 * Math.PI;
  // strokeDashoffset = full circumference when count=0, 0 when count=total
  const strokeDashoffset = circumference - (count / total) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg height={radius * 2} width={radius * 2} className="-rotate-90">
        {/* Background track circle */}
        <circle
          stroke="hsl(var(--muted))"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Animated progress circle — fills clockwise */}
        <circle
          stroke="hsl(var(--primary))"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference + " " + circumference}
          style={{ strokeDashoffset, transition: "stroke-dashoffset 1s ease-in-out" }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]"
        />
      </svg>
      {/* Center text overlay — shows "X of 10" */}
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-bold text-foreground">{count}</span>
        <span className="text-xs text-muted-foreground">of {total}</span>
      </div>
    </div>
  );
};

const TitheTechSection = () => {
  const [progress, setProgress] = useState<TitheTechProgress | null>(null);
  const [recipients, setRecipients] = useState<TitheTechRecipient[]>([]);

  /**
   * Fetch progress + recipients from Supabase on mount.
   * Both queries run in parallel via Promise.all.
   * tithe_tech_progress: single row (limit 1)
   * tithe_tech_recipients: all rows, newest first
   */
  useEffect(() => {
    const fetchData = async () => {
      const [progressRes, recipientsRes] = await Promise.all([
        supabase.from("tithe_tech_progress").select("*").limit(1).single(),
        supabase.from("tithe_tech_recipients").select("*").order("served_date", { ascending: false }),
      ]);
      if (progressRes.data) setProgress(progressRes.data as TitheTechProgress);
      if (recipientsRes.data) setRecipients(recipientsRes.data as TitheTechRecipient[]);
    };
    fetchData();
  }, []);

  // Calculate how many more audits until next free church service
  const remaining = progress ? 10 - progress.current_cycle_count : 10;

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      {/* Section header */}
      <div className="text-center mb-12">
        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Heart className="inline h-4 w-4 mr-1" />
          Community Giveback
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Tithe Tech — <span className="text-gradient-cyan">Giving Back, One Audit at a Time</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          For every 10 paid security audits, we donate a full audit and network optimization
          to a local church or nonprofit — <strong className="text-foreground">completely free</strong>.
        </p>
      </div>

      {/* Progress ring + stats — side by side on desktop, stacked on mobile */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-12">
        <div className="flex flex-col items-center">
          <ProgressRing count={progress?.current_cycle_count ?? 0} />
          <p className="mt-4 text-sm text-muted-foreground text-center max-w-[200px]">
            <strong className="text-foreground">{remaining} more</strong> audit{remaining !== 1 ? "s" : ""} until the next church is served
          </p>
        </div>
        {/* Lifetime stats */}
        <div className="flex gap-8">
          <div className="text-center">
            <p className="text-4xl font-bold text-primary">{progress?.total_churches_served ?? 0}</p>
            <p className="text-sm text-muted-foreground">Churches Served</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-foreground">
              {progress ? progress.total_churches_served * 10 + progress.current_cycle_count : 0}
            </p>
            <p className="text-sm text-muted-foreground">Total Audits</p>
          </div>
        </div>
      </div>

      {/* ============================================================
       *  WALL OF BLESSING — Recipient church cards
       *  Shows churches/nonprofits that have received free audits.
       *  Each card displays: church name, city/state, date served,
       *  and an optional testimonial quote.
       *  Empty state: "Our first Tithe Tech recipient is coming soon!"
       * ============================================================ */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-center mb-6 flex items-center justify-center gap-2">
          <Church className="h-5 w-5 text-primary" />
          Wall of Blessing
        </h3>
        {recipients.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {recipients.map((r) => (
              <Card key={r.id} className="bg-card border-primary/20 hover:border-primary/40 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-foreground">{r.church_name}</h4>
                      <p className="text-sm text-muted-foreground">{r.city}, {r.state}</p>
                    </div>
                    {/* Date badge — formatted as "Mon YYYY" */}
                    <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {new Date(r.served_date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </span>
                  </div>
                  {/* Optional testimonial quote */}
                  {r.testimonial && (
                    <div className="flex gap-2 mt-3">
                      <Quote className="h-4 w-4 text-primary/50 flex-shrink-0 mt-1" />
                      <p className="text-sm text-muted-foreground italic">{r.testimonial}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Empty state — shown when no churches have been served yet */
          <p className="text-center text-muted-foreground">
            Our first Tithe Tech recipient is coming soon!
          </p>
        )}
      </div>

      {/* Nomination CTA — links to contact section */}
      <p className="text-center text-sm text-muted-foreground">
        Know a church that needs help?{" "}
        <a href="#contact" className="text-primary hover:underline">Nominate them</a>.
      </p>
    </section>
  );
};

export default TitheTechSection;
