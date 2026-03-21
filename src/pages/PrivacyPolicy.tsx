import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Rooted Tech Services" className="h-8 w-8" />
            <span className="text-lg font-bold tracking-tight">
              Rooted<span className="text-primary">Tech</span> Services
            </span>
          </Link>
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">1. Information We Collect</h2>
            <p>Rooted Tech Services ("we," "us," or "our") collects information you provide directly to us when you:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Request a security audit or consultation</li>
              <li>Create an account on our client portal</li>
              <li>Contact us via email, phone, or our website</li>
              <li>Subscribe to our newsletter or updates</li>
            </ul>
            <p className="mt-3">This may include your name, email address, phone number, business name, business address, and network/system information relevant to the services you request.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Provide, maintain, and improve our cybersecurity services</li>
              <li>Conduct security audits and assessments as agreed upon in our Rules of Engagement</li>
              <li>Communicate with you about services, updates, and security advisories</li>
              <li>Comply with legal obligations, including Oklahoma SB 626 requirements</li>
              <li>Protect against fraud and unauthorized access</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">3. Data Security</h2>
            <p>We implement industry-standard security measures consistent with NIST, CIS, and OWASP frameworks to protect your personal information. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Access to client data is restricted to authorized personnel on a need-to-know basis.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">4. Data Retention</h2>
            <p>We retain personal information only for as long as necessary to fulfill the purposes outlined in this policy. Security audit reports and related documentation are retained for a minimum of three (3) years in accordance with industry standards and potential regulatory requirements under Oklahoma law.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">5. Information Sharing</h2>
            <p>We do not sell, trade, or rent your personal information. We may share information only in the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><strong className="text-foreground">With your consent:</strong> When you authorize us to share findings with third-party vendors or partners</li>
              <li><strong className="text-foreground">Legal compliance:</strong> When required by law, regulation, or legal process</li>
              <li><strong className="text-foreground">Responsible disclosure:</strong> Vulnerability information is shared only with you, the client, per our Rules of Engagement</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information (subject to legal retention requirements)</li>
              <li>Opt out of non-essential communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">7. Cookies & Analytics</h2>
            <p>Our website uses essential cookies for functionality and anonymous analytics to improve our services. We do not use tracking cookies for advertising purposes.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">8. Children's Privacy</h2>
            <p>Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">9. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated policy on our website with a revised "Last updated" date.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">10. Contact Us</h2>
            <p>If you have questions about this Privacy Policy or our data practices, contact us at:</p>
            <p className="mt-2">
              <strong className="text-foreground">Rooted Tech Services</strong><br />
              Oklahoma City, OK<br />
              Email: privacy@rootedtechservices.com
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-border py-6">
        <div className="max-w-4xl mx-auto px-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Rooted Tech Services. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
