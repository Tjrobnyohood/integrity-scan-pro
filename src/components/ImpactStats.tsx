/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  IMPACT STATS — Animated Counter Section                       ║
 * ╠══════════════════════════════════════════════════════════════════╣
 * ║  PURPOSE:                                                       ║
 * ║  Displays key cybersecurity impact metrics with animated        ║
 * ║  count-up numbers that trigger when scrolled into view.         ║
 * ║                                                                  ║
 * ║  STATS DISPLAYED:                                                ║
 * ║  - Security issues resolved (total findings remediated)         ║
 * ║  - Devices secured (endpoints under our protection)             ║
 * ║  - Awareness trainings (workshops/sessions delivered)           ║
 * ║  - Uptime guarantee percentage                                   ║
 * ║                                                                  ║
 * ║  HOW IT WORKS:                                                   ║
 * ║  - IntersectionObserver detects when section enters viewport    ║
 * ║  - requestAnimationFrame drives smooth number animation         ║
 * ║  - Each stat has: value (target number), suffix, label, icon    ║
 * ║                                                                  ║
 * ║  TO UPDATE STATS:                                                ║
 * ║  Edit the stats[] array below. Change value/label as needed.    ║
 * ║  suffix: appended to number (e.g. "+", "%", "k")               ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

import { useEffect, useRef, useState } from "react";
import { Shield, Monitor, BookOpen, Activity } from "lucide-react";
import { LucideIcon } from "lucide-react";

/**
 * stats[] — Impact metric data
 * ╔════════════════════════════════════════════════════════╗
 * ║  TO UPDATE A STAT:                                    ║
 * ║  - value: target number the counter animates to       ║
 * ║  - suffix: text after number ("+", "%", "k", etc.)    ║
 * ║  - label: description text below the number           ║
 * ║  - icon: Lucide icon component                        ║
 * ║  - description: tooltip/context for what this means   ║
 * ╚════════════════════════════════════════════════════════╝
 */
const stats: { value: number; suffix: string; label: string; icon: LucideIcon; description: string }[] = [
  {
    value: 47,
    suffix: "+",
    label: "Security Issues Resolved",
    icon: Shield,
    description: "Vulnerabilities identified and remediated across client networks",
  },
  {
    value: 120,
    suffix: "+",
    label: "Devices Secured",
    icon: Monitor,
    description: "Endpoints, routers, and IoT devices hardened and monitored",
  },
  {
    value: 8,
    suffix: "",
    label: "Awareness Workshops",
    icon: BookOpen,
    description: "Cybersecurity training sessions delivered to Oklahoma businesses",
  },
  {
    value: 99.9,
    suffix: "%",
    label: "Uptime Maintained",
    icon: Activity,
    description: "Average network uptime across all managed clients",
  },
];

/**
 * useCountUp — Custom hook for animated number counting
 * Uses requestAnimationFrame for smooth 60fps animation.
 * Triggers once when `start` becomes true (via IntersectionObserver).
 * duration: animation length in ms (default 2000)
 */
function useCountUp(target: number, start: boolean, duration = 2000) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const isDecimal = target % 1 !== 0;

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      /* easeOutQuart for a satisfying deceleration curve */
      const eased = 1 - Math.pow(1 - progress, 4);
      setCurrent(isDecimal ? parseFloat((eased * target).toFixed(1)) : Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, [start, target, duration]);

  return current;
}

/**
 * AnimatedStat — Single stat card with count-up animation
 * Renders icon, animated number + suffix, label, and hover description
 */
function AnimatedStat({ stat, started }: { stat: typeof stats[0]; started: boolean }) {
  const count = useCountUp(stat.value, started);
  const Icon = stat.icon;

  return (
    <div className="text-center group" title={stat.description}>
      {/* Icon — uses primary color token, scales on hover */}
      <Icon className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
      {/* Animated counter — large bold number with cyan gradient */}
      <div className="text-4xl md:text-5xl font-bold text-gradient-cyan mb-1">
        {count}{stat.suffix}
      </div>
      {/* Label — muted foreground for visual hierarchy */}
      <p className="text-sm text-muted-foreground">{stat.label}</p>
    </div>
  );
}

/**
 * ImpactStats — Main exported component
 * Wraps all stat cards in a responsive grid.
 * IntersectionObserver triggers animation once on first scroll into view.
 */
export default function ImpactStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="max-w-6xl mx-auto px-4 py-16">
      {/* Section heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Our <span className="text-gradient-cyan">Impact</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Real numbers from real work protecting Oklahoma businesses and communities.
        </p>
      </div>
      {/* Stats grid — 4 columns on desktop, 2 on tablet, stacked on mobile */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <AnimatedStat key={stat.label} stat={stat} started={started} />
        ))}
      </div>
    </section>
  );
}
