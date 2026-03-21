import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg";

const TermsOfService = () => {
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
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using the services provided by Rooted Tech Services ("Company," "we," "us"), you agree to be bound by these Terms of Service. If you do not agree, do not use our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">2. Services Provided</h2>
            <p>Rooted Tech Services provides cybersecurity consulting, network security audits, vulnerability assessments, security camera installation, ransomware defense, and compliance consulting services. All security testing is performed under a signed Rules of Engagement (ROE) agreement.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">3. Rules of Engagement</h2>
            <p>All penetration testing, vulnerability assessments, and security audits are conducted strictly within the scope defined in a mutually signed Rules of Engagement document. We will not:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Access systems outside the agreed-upon scope</li>
              <li>Perform testing without written authorization</li>
              <li>Disclose vulnerabilities to unauthorized third parties</li>
              <li>Retain client data beyond the agreed retention period</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">4. Client Responsibilities</h2>
            <p>Clients agree to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Provide accurate information about systems to be tested</li>
              <li>Ensure they have legal authority to authorize testing on the specified systems</li>
              <li>Designate an authorized point of contact for the duration of the engagement</li>
              <li>Not use our services for any unlawful purpose</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">5. Compliance & Regulatory</h2>
            <p>Our services are designed to help clients achieve compliance with applicable regulations, including but not limited to Oklahoma Senate Bill 626 (effective January 1, 2026). However, we do not guarantee regulatory compliance. Final compliance determination rests with the relevant regulatory authority.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">6. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, Rooted Tech Services shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use of our services. Our total liability for any claim shall not exceed the amount paid by the client for the specific service giving rise to the claim.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">7. Confidentiality</h2>
            <p>Both parties agree to maintain the confidentiality of all information exchanged during the engagement. Audit findings, vulnerability reports, and remediation recommendations are considered confidential and will not be shared with third parties without written consent.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">8. Responsible Disclosure</h2>
            <p>We practice responsible disclosure. All vulnerabilities discovered during an engagement are reported exclusively to the client with a clear remediation plan. We follow NIST, CIS, and OWASP frameworks for all assessments.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">9. Payment Terms</h2>
            <p>Payment terms are outlined in each individual service agreement. Unless otherwise stated, invoices are due within thirty (30) days of receipt. Late payments may be subject to a 1.5% monthly interest charge.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">10. Termination</h2>
            <p>Either party may terminate services with thirty (30) days written notice. In the event of termination, the client is responsible for payment of all services rendered through the termination date. All confidentiality obligations survive termination.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">11. Governing Law</h2>
            <p>These Terms are governed by and construed in accordance with the laws of the State of Oklahoma. Any disputes arising from these Terms shall be resolved in the courts of Oklahoma County, Oklahoma.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">12. Amendments</h2>
            <p>We reserve the right to modify these Terms at any time. Material changes will be communicated via our website or direct notification. Continued use of our services constitutes acceptance of updated Terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">13. Contact</h2>
            <p>For questions about these Terms of Service:</p>
            <p className="mt-2">
              <strong className="text-foreground">Rooted Tech Services</strong><br />
              Oklahoma City, OK<br />
              Email: legal@rootedtechservices.com
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

export default TermsOfService;
