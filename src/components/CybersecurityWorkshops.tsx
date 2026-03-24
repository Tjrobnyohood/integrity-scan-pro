/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  CYBERSECURITY WORKSHOPS — Educational Offerings Section       ║
 * ╠══════════════════════════════════════════════════════════════════╣
 * ║  PURPOSE:                                                       ║
 * ║  Showcases the cybersecurity workshops Rooted Tech offers to    ║
 * ║  Oklahoma businesses, churches, and nonprofits.                 ║
 * ║                                                                  ║
 * ║  TOPICS COVERED:                                                 ║
 * ║  - Phishing awareness & email security                          ║
 * ║  - Password hygiene & MFA setup                                  ║
 * ║  - Ransomware prevention for small businesses                   ║
 * ║  - SB 626 compliance walkthrough                                 ║
 * ║                                                                  ║
 * ║  TO ADD A WORKSHOP TOPIC:                                        ║
 * ║  Add an object to the workshops[] array below with:             ║
 * ║    title, description, audience, icon                           ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, ShieldAlert, KeyRound, FileText, Users } from "lucide-react";
import { LucideIcon } from "lucide-react";

/**
 * workshops[] — Workshop topic data
 * Each entry renders as a card in the grid.
 * audience: who should attend (shown as a badge)
 */
const workshops: { title: string; description: string; audience: string; icon: LucideIcon }[] = [
  {
    icon: ShieldAlert,
    title: "Phishing & Email Security",
    description: "Learn to spot phishing emails, social engineering tricks, and business email compromise. Hands-on examples with real-world attack simulations.",
    audience: "All Staff",
  },
  {
    icon: KeyRound,
    title: "Password Hygiene & MFA",
    description: "Set up multi-factor authentication, use password managers, and understand why 'Password123' is a hacker's best friend.",
    audience: "All Staff",
  },
  {
    icon: ShieldAlert,
    title: "Ransomware Prevention",
    description: "What ransomware is, how it gets in, and what to do if it happens. Backup strategies, endpoint protection, and incident response basics.",
    audience: "Business Owners",
  },
  {
    icon: FileText,
    title: "SB 626 Compliance Workshop",
    description: "Walk through Oklahoma's new data breach law step by step. Learn what's required, what 'safe harbor' means, and how to document your security posture.",
    audience: "Leadership & IT",
  },
];

export default function CybersecurityWorkshops() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      {/* Section header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <BookOpen className="inline h-8 w-8 text-primary mr-2 -mt-1" />
          Cybersecurity <span className="text-gradient-cyan">Workshops</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Free and low-cost training sessions for Oklahoma businesses, churches, and nonprofits.
          Because the best firewall is an educated team.
        </p>
      </div>

      {/* Workshop cards — 2-col grid, each with icon, title, audience badge, description */}
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {workshops.map((w) => (
          <Card key={w.title} className="bg-card border-border hover:border-primary/40 transition-colors group">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                {/* Workshop icon — primary color, hover scale */}
                <w.icon className="h-8 w-8 text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold">{w.title}</h3>
                    {/* Audience badge — shows who the workshop targets */}
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {w.audience}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{w.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA — encourage booking a workshop */}
      <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground">
          Interested in a workshop for your team?{" "}
          <a href="#contact" className="text-primary hover:underline">
            Contact us to schedule →
          </a>
        </p>
      </div>
    </section>
  );
}
