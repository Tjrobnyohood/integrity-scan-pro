import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Church, Heart, Quote } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface TitheTechProgress {
  current_cycle_count: number;
  total_churches_served: number;
}

interface TitheTechRecipient {
  id: string;
  church_name: string;
  city: string;
  state: string;
  served_date: string;
  testimonial: string | null;
}

const ProgressRing = ({ count, total = 10 }: { count: number; total?: number }) => {
  const radius = 70;
  const stroke = 8;
  const normalizedRadius = radius - stroke;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (count / total) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg height={radius * 2} width={radius * 2} className="-rotate-90">
        <circle
          stroke="hsl(var(--muted))"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
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

  const remaining = progress ? 10 - progress.current_cycle_count : 10;

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
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

      {/* Progress + Stats */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-12">
        <div className="flex flex-col items-center">
          <ProgressRing count={progress?.current_cycle_count ?? 0} />
          <p className="mt-4 text-sm text-muted-foreground text-center max-w-[200px]">
            <strong className="text-foreground">{remaining} more</strong> audit{remaining !== 1 ? "s" : ""} until the next church is served
          </p>
        </div>
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

      {/* Wall of Blessing */}
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
                    <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {new Date(r.served_date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </span>
                  </div>
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
          <p className="text-center text-muted-foreground">
            Our first Tithe Tech recipient is coming soon!
          </p>
        )}
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Know a church that needs help?{" "}
        <a href="#contact" className="text-primary hover:underline">Nominate them</a>.
      </p>
    </section>
  );
};

export default TitheTechSection;
