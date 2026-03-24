/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  LANDING PAGE — Rooted Tech Services                           ║
 * ║  Main public-facing page for the business                      ║
 * ╠══════════════════════════════════════════════════════════════════╣
 * ║  SECTIONS (in order):                                          ║
 * ║  1. Sticky Nav        — Logo, Client Portal link, CTA          ║
 * ║  2. Hero              — Brand logo (large), tagline, CTAs      ║
 * ║  3. SB 626 Explainer  — Oklahoma data breach law breakdown     ║
 * ║  4. Services Grid     — 6 service cards (one "Coming Soon")    ║
 * ║  5. "Built for OK"    — 3 value-prop cards                     ║
 * ║  6. Tithe Tech        — Community giveback tracker (component)  ║
 * ║  7. Featured Partners — Business/nonprofit showcase (component) ║
 * ║  8. Standards & Ethics— ROE + Full Disclosure cards            ║
 * ║  9. CTA / Contact     — Final call-to-action                   ║
 * ║ 10. OKC Helping Hands — Partner badge (component)              ║
 * ║ 11. Footer            — Legal links, easter egg                ║
 * ╠══════════════════════════════════════════════════════════════════╣
 * ║  DESIGN SYSTEM:                                                ║
 * ║  - All colors use HSL CSS vars from index.css                  ║
 * ║  - glow-cyan / text-gradient-cyan = custom utility classes     ║
 * ║  - WroughtIronDivider = decorative SVG section separator       ║
 * ║  - Cards use bg-card, border-border, text-foreground tokens    ║
 * ╠══════════════════════════════════════════════════════════════════╣
 * ║  TO ADD A NEW SECTION:                                         ║
 * ║  1. Create section JSX between <WroughtIronDivider /> tags     ║
 * ║  2. Use max-w-6xl mx-auto px-4 py-12 for consistent spacing   ║
 * ║  3. Use <Card> + <CardContent> for content blocks              ║
 * ║  4. Or extract to a component in src/components/               ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import logo from "@/assets/logo.svg";
import {
  Shield, Camera, ShieldAlert, Lock, FileText, AlertTriangle,
  CheckCircle2, XCircle, ArrowRight, Phone, Mail, MapPin, Wifi, Eye, Users
} from "lucide-react";
import { Link } from "react-router-dom";
import TitheTechSection from "@/components/TitheTechSection";
import OKCHelpingHandsBadge from "@/components/OKCHelpingHandsBadge";
import FeaturedPartnersSection from "@/components/FeaturedPartnersSection";
import ImpactStats from "@/components/ImpactStats";
import CybersecurityWorkshops from "@/components/CybersecurityWorkshops";
import { Heart } from "lucide-react";

/**
 * WroughtIronDivider — Decorative section separator
 * SVG-based "wrought iron gate" motif for Southern/Oklahoma aesthetic.
 * Uses primary color at low opacity for subtlety.
 * Placed between major sections to break up content.
 */
const WroughtIronDivider = () => (
  <div className="flex items-center justify-center my-12 px-4">
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    <svg viewBox="0 0 60 24" className="w-16 h-6 mx-4 text-primary/40" fill="currentColor">
      <path d="M30 2c-4 0-7 3-7 7 0 2 1 4 3 5l-3 3h14l-3-3c2-1 3-3 3-5 0-4-3-7-7-7zm0 2c3 0 5 2 5 5s-2 5-5 5-5-2-5-5 2-5 5-5z" opacity="0.6"/>
      <path d="M10 12c-2 0-4-1-4-3s2-3 4-3c1 0 2 0 3 1M50 12c2 0 4-1 4-3s-2-3-4-3c-1 0-2 0-3 1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="6" cy="12" r="1.5"/><circle cx="54" cy="12" r="1.5"/>
    </svg>
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
  </div>
);

/**
 * services[] — Service card data
 * ╔════════════════════════════════════════════════════════╗
 * ║  TO ADD A NEW SERVICE:                                ║
 * ║  1. Import icon from lucide-react at top of file      ║
 * ║  2. Add object to this array                          ║
 * ║  3. Fields:                                           ║
 * ║     icon:        Lucide icon component                ║
 * ║     title:       Service name (short)                 ║
 * ║     description: 1-2 sentence pitch                   ║
 * ║     comingSoon:  (optional) true = "Coming Soon" badge ║
 * ╚════════════════════════════════════════════════════════╝
 */
const services = [
  {
    icon: Shield,
    title: "Security Audits",
    description: "Comprehensive network vulnerability assessments following NIST and CIS frameworks. We test your defenses so hackers don't have to.",
  },
  {
    icon: ShieldAlert,
    title: "Ransomware Defense",
    description: "State-of-the-art endpoint protection and threat detection. We stop ransomware, viruses, and phishing before they stop your business.",
  },
  {
    icon: Lock,
    title: "Access Control",
    description: "Multi-factor authentication, encrypted networks, and role-based access. Only the right people get in — period.",
  },
  {
    icon: Camera,
    title: "Camera & Surveillance",
    description: "Professional installation of security camera systems with remote monitoring. See what's happening at your business, day or night.",
  },
  {
    icon: Wifi,
    title: "Network Infrastructure",
    description: "Enterprise-grade routers, firewalls, and Wi-Fi designed for reliability. Your business stays connected and protected.",
  },
  {
    icon: Eye,
    title: "OSINT & Threat Intelligence",
    description: "Open-source intelligence gathering to identify threats before they materialize. Know what the bad actors know — and stay ahead.",
    comingSoon: true,
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ============================================================
       *  SECTION 1: STICKY NAVIGATION BAR
       *  - Logo + brand name on the left
       *  - "Client Portal" links to /dashboard (internal tool)
       *  - "Get Protected" CTA scrolls to #contact section
       *  - backdrop-blur-md for frosted glass effect
       * ============================================================ */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Rooted Tech Services" className="h-10 w-10" />
            <span className="text-lg font-bold tracking-tight">
              Rooted<span className="text-primary">Tech</span> Services
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">Client Portal</Button>
            </Link>
            <a href="#contact">
              <Button size="sm" className="glow-cyan">Get Protected</Button>
            </a>
          </div>
        </div>
      </nav>

      {/* ============================================================
       *  SECTION 2: HERO
       *  - Large logo (h-[30rem]) — scaled up per user request
       *  - Main tagline with text-gradient-cyan utility
       *  - Subtle paisley SVG background pattern (Oklahoma aesthetic)
       *  - Two CTA buttons: compliance check + services
       * ============================================================ */}
      <section className="relative overflow-hidden">
        {/* Gradient overlay at top */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        {/* Subtle paisley-inspired background pattern — Oklahoma/Southern motif */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5c-8 0-14 6-14 14 0 5 3 10 7 13-2 3-3 7-3 11 0 6 4 12 10 12s10-6 10-12c0-4-1-8-3-11 4-3 7-8 7-13 0-8-6-14-14-14z' fill='none' stroke='%2300e5ff' stroke-width='0.5'/%3E%3C/svg%3E")`,
        }} />
        <div className="max-w-6xl mx-auto px-4 py-24 text-center relative">
          <img src={logo} alt="Rooted Tech Services" className="h-[30rem] w-[30rem] mx-auto mb-8" />
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Your Network, <span className="text-gradient-cyan">Rooted in Excellence</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
            Faith-driven cybersecurity for Oklahoma communities. We protect your business with
            enterprise-grade security — explained in plain English.
          </p>
          <p className="text-sm text-muted-foreground/70 mb-8">
            Serving Oklahoma City & rural communities across the state
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#sb626">
              <Button size="lg" className="glow-cyan text-lg px-8">
                <FileText className="mr-2 h-5 w-5" />
                Am I Compliant?
              </Button>
            </a>
            <a href="#services">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Our Services
              </Button>
            </a>
          </div>
        </div>
      </section>

      <WroughtIronDivider />

      {/* ============================================================
       *  SECTION 3: OKLAHOMA SENATE BILL 626 EXPLAINER
       *  - Plain-English breakdown of OK's data breach law (eff. Jan 2026)
       *  - "Safe Harbor" explanation — why compliance = protection
       *  - "Without It" card — fines up to $150k, AG notification, lawsuits
       *  - Side-by-side comparison: Compliant vs Non-Compliant
       *  - Key selling point: positions Rooted Tech as the compliance partner
       * ============================================================ */}
      <section id="sb626" className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-medium mb-4">
            <AlertTriangle className="inline h-4 w-4 mr-1" />
            Effective January 1, 2026
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Oklahoma Senate Bill 626
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Oklahoma just passed the biggest update to its data breach law in history.
            Here's what it means for <strong className="text-foreground">your</strong> business — in plain English.
          </p>
        </div>

        {/* Safe Harbor vs No Protection — two-card explainer */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                What is "Safe Harbor"?
              </h3>
              <p className="text-muted-foreground mb-4">
                Think of it like an insurance policy for your data. If a hacker breaks in but you can <strong className="text-foreground">prove</strong> you had real security measures in place, the state won't fine you.
              </p>
              <p className="text-muted-foreground">
                That means regular security checkups, encrypted data, multi-factor authentication, and a documented plan for when things go wrong. <strong className="text-foreground">We set all of that up for you.</strong>
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                What Happens Without It?
              </h3>
              <p className="text-muted-foreground mb-4">
                If a hacker breaches your system and you <strong className="text-foreground">don't</strong> have proper safeguards:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Up to <strong className="text-foreground">$150,000 in fines</strong> per breach</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Mandatory notification to the <strong className="text-foreground">Attorney General</strong> if 500+ people are affected</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Loss of customer trust and potential <strong className="text-foreground">lawsuits</strong></span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Compliance comparison — visual checklist format */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Compliant card — green accents, check icons */}
          <Card className="bg-card border-primary/20 border-2">
            <CardContent className="p-6">
              <h4 className="font-bold text-success flex items-center gap-2 mb-4">
                <CheckCircle2 className="h-5 w-5" />
                With Rooted Tech (Compliant)
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" /> Regular risk assessments documented</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" /> Multi-factor authentication on all systems</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" /> Data encrypted in transit and at rest</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" /> Incident response plan tested annually</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" /> Employee security training completed</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" /> <strong className="text-foreground">$0 in penalties</strong> — safe harbor protection</li>
              </ul>
            </CardContent>
          </Card>

          {/* Non-compliant card — red accents, X icons */}
          <Card className="bg-card border-destructive/20 border-2">
            <CardContent className="p-6">
              <h4 className="font-bold text-destructive flex items-center gap-2 mb-4">
                <XCircle className="h-5 w-5" />
                Without Protection (Non-Compliant)
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive flex-shrink-0" /> No documented security measures</li>
                <li className="flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive flex-shrink-0" /> Passwords only — no MFA</li>
                <li className="flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive flex-shrink-0" /> Unencrypted customer data</li>
                <li className="flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive flex-shrink-0" /> No incident response plan</li>
                <li className="flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive flex-shrink-0" /> Staff clicks phishing emails regularly</li>
                <li className="flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive flex-shrink-0" /> <strong className="text-foreground">Up to $150,000</strong> in fines per breach</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <WroughtIronDivider />

      {/* ============================================================
       *  SECTION 4: SERVICES GRID
       *  - 6 service cards in 3-col grid (2-col on tablet, 1-col mobile)
       *  - Each card: icon, title, description
       *  - Hover effect: left cyan border (inset shadow trick)
       *  - "Coming Soon" badge for unreleased services (OSINT)
       *  - Data driven by services[] array above
       * ============================================================ */}
      <section id="services" className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Do</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From security audits to camera installs — we handle the tech so you can handle your business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.title} className="bg-card border-border hover:border-primary/40 hover:shadow-[inset_3px_0_0_hsl(var(--primary))] transition-all group relative">
              {/* "Coming Soon" badge — only shows if service.comingSoon is true */}
              {service.comingSoon && (
                <span className="absolute top-3 right-3 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  Coming Soon
                </span>
              )}
              <CardContent className="p-6">
                <service.icon className="h-10 w-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <WroughtIronDivider />

      {/* ============================================================
       *  SECTION 5: "BUILT FOR OKLAHOMA" — VALUE PROPOSITIONS
       *  - 3 cards: Plain English, On-Site Service, Integrity First
       *  - Differentiators for rural OK market
       *  - Icons centered, text centered
       * ============================================================ */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built for <span className="text-gradient-cyan">Oklahoma</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Rural communities deserve the same protection as Fortune 500 companies.
            We bring enterprise security to your doorstep — no jargon, no runaround.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-card border-border text-center">
            <CardContent className="p-6">
              <Users className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">Plain English</h3>
              <p className="text-sm text-muted-foreground">We explain every finding in language you understand. No tech jargon. Just clear answers.</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border text-center">
            <CardContent className="p-6">
              <MapPin className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">On-Site Service</h3>
              <p className="text-sm text-muted-foreground">Based in OKC, we come to you. Camera installs, network setups, and audits — all hands-on.</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border text-center">
            <CardContent className="p-6">
              <Shield className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">Integrity First</h3>
              <p className="text-sm text-muted-foreground">God-first business. We follow strict rules of engagement, full disclosure, and industry security standards.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <WroughtIronDivider />

      {/* ============================================================
       *  SECTION 5.5: IMPACT STATS — ANIMATED COUNTERS
       *  - Component: src/components/ImpactStats.tsx
       *  - Animated count-up numbers triggered on scroll into view
       *  - Stats: issues resolved, devices secured, workshops, uptime
       *  - To update: edit stats[] array in ImpactStats.tsx
       * ============================================================ */}
      <ImpactStats />

      <WroughtIronDivider />

      {/* ============================================================
       *  SECTION 5.6: CYBERSECURITY WORKSHOPS
       *  - Component: src/components/CybersecurityWorkshops.tsx
       *  - Workshop topics: phishing, passwords, ransomware, SB 626
       *  - Each card shows audience badge (All Staff, Business Owners, etc.)
       *  - To add workshops: edit workshops[] array in component
       * ============================================================ */}
      <CybersecurityWorkshops />

      {/* ============================================================
       *  SECTION 6: TITHE TECH — COMMUNITY GIVEBACK
       *  - Component: src/components/TitheTechSection.tsx
       *  - Progress ring: tracks audits toward next free church service
       *  - "Wall of Blessing": grid of recipient churches
       *  - Data from Supabase: tithe_tech_progress + tithe_tech_recipients
       *  - Every 10 paid audits = 1 free audit for a church/nonprofit
       * ============================================================ */}
      <TitheTechSection />

      <WroughtIronDivider />

      {/* ============================================================
       *  SECTION 7: FEATURED PARTNERS — COMMUNITY SPOTLIGHT
       *  - Component: src/components/FeaturedPartnersSection.tsx
       *  - Showcases small businesses and nonprofits we work with
       *  - To add partners: edit the partners[] array in that file
       *  - Supports: name, description, type (business/nonprofit), image, url
       * ============================================================ */}
      <FeaturedPartnersSection />

      <WroughtIronDivider />

      {/* ============================================================
       *  SECTION 8: STANDARDS & ETHICS
       *  - Rules of Engagement card — links to ROE template download + generator
       *  - Full Disclosure card — NIST/CIS/OWASP framework commitment
       *  - ROE Generator at /roe-generator: form → fills template → downloads .md
       *  - .md output designed for pandoc + LaTeX pipeline with branding
       * ============================================================ */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Our Standards & Ethics</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Rules of Engagement
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Every audit begins with a signed scope agreement. We define exactly what we test,
                when we test, and what's off-limits. No surprises. No unauthorized access.
                Everything documented, everything by the book.
              </p>
              <div className="flex flex-wrap gap-3">
                {/* Direct download of the blank ROE markdown template */}
                <a
                  href="/Rooted_Tech_ROE_Template.md"
                  download
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  <ArrowRight className="h-3 w-3" />
                  Download ROE Template
                </a>
                {/* Link to the interactive ROE form generator at /roe-generator */}
                <Link
                  to="/roe-generator"
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  <FileText className="h-3 w-3" />
                  Generate Custom ROE
                </Link>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                Full Disclosure
              </h3>
              <p className="text-sm text-muted-foreground">
                We practice responsible disclosure. Every vulnerability we find is reported to you
                first with a clear remediation plan. We follow NIST, CIS, and OWASP frameworks.
                Your data never leaves our secured systems.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <WroughtIronDivider />

      {/* ============================================================
       *  SECTION 9: CALL TO ACTION / CONTACT
       *  - Final CTA with glow-cyan card effect
       *  - "Schedule a Free Audit" + "Contact Us" buttons
       *  - Location badge (OKC) + framework compliance badge
       * ============================================================ */}
      <section id="contact" className="max-w-6xl mx-auto px-4 py-16">
        <Card className="bg-card border-primary/20 glow-cyan">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Protected?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Don't wait for January 2026. Get your free compliance assessment today and
              find out where you stand before the law takes effect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="glow-cyan text-lg px-8">
                <Phone className="mr-2 h-5 w-5" />
                Schedule a Free Audit
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                <Mail className="mr-2 h-5 w-5" />
                Contact Us
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Oklahoma City, OK
              </span>
              <span className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                NIST · CIS · OWASP Compliant
              </span>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ============================================================
       *  SECTION 10: OKC HELPING HANDS BADGE
       *  - Component: src/components/OKCHelpingHandsBadge.tsx
       *  - Links to https://okc-helping-hands.vercel.app
       *  - "Dedicated to protecting our most vulnerable populations"
       *  - Heart icon with hover scale animation
       * ============================================================ */}
      <OKCHelpingHandsBadge />

      {/* ============================================================
       *  SECTION 11: FOOTER
       *  - Logo + brand name
       *  - Nav links: Privacy Policy, Terms of Service, Contact, ROE Template
       *  - Copyright with dynamic year
       *  - Easter egg: "Col 3:23 · Soli Deo Gloria" — glows on hover
       *    (Colossians 3:23 — "Whatever you do, work at it with all your heart")
       *  - Hidden ASCII art in source: Psalm 18:2 fortress
       * ============================================================ */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Rooted Tech Services" className="h-8 w-8" />
              <span className="text-sm font-medium">Rooted Tech Services</span>
            </div>
            <nav className="flex items-center gap-6 text-sm text-muted-foreground" aria-label="Footer navigation">
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
              <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
              <a href="/Rooted_Tech_ROE_Template.md" download className="hover:text-primary transition-colors">ROE Template</a>
            </nav>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Rooted Tech Services. All rights reserved. Oklahoma City, OK.
            </p>
            {/* Easter egg: hover to reveal mission — Colossians 3:23 */}
            <p
              className="text-xs text-muted-foreground/40 select-none cursor-default transition-all duration-700 hover:text-primary/60 hover:tracking-wide"
              title="Colossians 3:23 — Whatever you do, work at it with all your heart, as working for the Lord."
            >
              Col 3:23 · Soli Deo Gloria
            </p>
            {/* Hidden ASCII easter egg — inspect element to find
              ██████╗  ██████╗  ██████╗ ████████╗███████╗██████╗ 
              ██╔══██╗██╔═══██╗██╔═══██╗╚══██╔══╝██╔════╝██╔══██╗
              ██████╔╝██║   ██║██║   ██║   ██║   █████╗  ██║  ██║
              ██╔══██╗██║   ██║██║   ██║   ██║   ██╔══╝  ██║  ██║
              ██║  ██║╚██████╔╝╚██████╔╝   ██║   ███████╗██████╔╝
              ╚═╝  ╚═╝ ╚═════╝  ╚═════╝    ╚═╝   ╚══════╝╚═════╝ 
              "The Lord is my rock and my fortress." — Psalm 18:2
            */}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
