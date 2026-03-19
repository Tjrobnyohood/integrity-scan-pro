import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import logo from "@/assets/logo.png";
import {
  Shield, Camera, Bug, Lock, FileText, AlertTriangle,
  CheckCircle2, XCircle, ArrowRight, Phone, Mail, MapPin, Wifi, Eye, Users
} from "lucide-react";
import { Link } from "react-router-dom";

const WroughtIronDivider = () => (
  <div className="flex items-center justify-center my-12 px-4">
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    <svg viewBox="0 0 60 24" className="w-16 h-6 mx-4 text-primary/40" fill="currentColor">
      <path d="M30 2c-4 0-7 3-7 7 0 2 1 4 3 5l-3 3h14l-3-3c2-1 3-3 3-5 0-4-3-7-7-7zm0 2c3 0 5 2 5 5s-2 5-5 5-5-2-5-5 2-5 5-5z" opacity="0.6"/>
      <path d="M10 12c-2 0-4-1-4-3s2-3 4-3c1 0 2 0 3 1M50 12c2 0 4-1 4-3s-2-3-4-3c-1 0-2 0-3 1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="6" cy="12" r="1.5"/><circle cx="54" cy="12" r="1.5"/>
    </svg>
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
  </div>
);

const services = [
  {
    icon: Shield,
    title: "Security Audits",
    description: "Comprehensive network vulnerability assessments following NIST and CIS frameworks. We test your defenses so hackers don't have to.",
  },
  {
    icon: Camera,
    title: "Camera & Surveillance",
    description: "Professional installation of security camera systems with remote monitoring. See what's happening at your business, day or night.",
  },
  {
    icon: Bug,
    title: "Malware Protection",
    description: "State-of-the-art endpoint protection and threat detection. We stop ransomware, viruses, and phishing before they stop your business.",
  },
  {
    icon: Lock,
    title: "Access Control",
    description: "Multi-factor authentication, encrypted networks, and role-based access. Only the right people get in — period.",
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
      {/* Navigation */}
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

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        {/* Subtle paisley-inspired background pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5c-8 0-14 6-14 14 0 5 3 10 7 13-2 3-3 7-3 11 0 6 4 12 10 12s10-6 10-12c0-4-1-8-3-11 4-3 7-8 7-13 0-8-6-14-14-14z' fill='none' stroke='%2300e5ff' stroke-width='0.5'/%3E%3C/svg%3E")`,
        }} />
        <div className="max-w-6xl mx-auto px-4 py-24 text-center relative">
          <img src={logo} alt="Rooted Tech Services" className="h-28 w-28 mx-auto mb-8" />
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

      {/* SB 626 Section */}
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

        {/* Compliance comparison */}
        <div className="grid md:grid-cols-2 gap-6">
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

      {/* Services */}
      <section id="services" className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Do</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From security audits to camera installs — we handle the tech so you can handle your business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.title} className="bg-card border-border hover:border-primary/30 transition-colors group relative">
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

      {/* Why Rural Communities */}
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

      {/* Disclosure & Standards */}
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
              <p className="text-sm text-muted-foreground">
                Every audit begins with a signed scope agreement. We define exactly what we test,
                when we test, and what's off-limits. No surprises. No unauthorized access.
                Everything documented, everything by the book.
              </p>
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

      {/* CTA / Contact */}
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

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Rooted Tech Services" className="h-8 w-8" />
            <span className="text-sm font-medium">Rooted Tech Services</span>
          </div>
          <p className="text-xs text-muted-foreground/40 select-none" title="Colossians 3:23">
            Col 3:23 — Whatever you do, work at it with all your heart.
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Rooted Tech Services. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
