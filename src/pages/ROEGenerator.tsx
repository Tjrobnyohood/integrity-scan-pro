/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  ROE GENERATOR — Rules of Engagement Form → Markdown Download  ║
 * ╠══════════════════════════════════════════════════════════════════╣
 * ║  PURPOSE:                                                      ║
 * ║  Interactive form that fills in a Rules of Engagement template  ║
 * ║  and downloads a .md file ready for pandoc + LaTeX pipeline.   ║
 * ╠══════════════════════════════════════════════════════════════════╣
 * ║  WORKFLOW:                                                     ║
 * ║  1. User fills in form fields (client info, scope, activities) ║
 * ║  2. User can toggle "Preview" to see the generated markdown    ║
 * ║  3. "Download .md" creates a Blob and triggers browser download║
 * ║  4. User runs the .md through pandoc + LaTeX with their brand  ║
 * ║     templates to produce a professional branded PDF             ║
 * ╠══════════════════════════════════════════════════════════════════╣
 * ║  MARKDOWN OUTPUT:                                              ║
 * ║  - YAML frontmatter: title, subtitle, author, date, geometry   ║
 * ║    (These are consumed by pandoc/LaTeX for PDF generation)     ║
 * ║  - 10 sections: Purpose, Scope, Activities, Testing Window,   ║
 * ║    Communication, Data Handling, Legal, Reporting, Frameworks, ║
 * ║    Signatures                                                  ║
 * ║  - Empty fields fall back to placeholder text like [CLIENT]    ║
 * ╠══════════════════════════════════════════════════════════════════╣
 * ║  FILE NAMING:                                                  ║
 * ║  ROE_{ClientName}_{YYYY-MM-DD}.md                              ║
 * ║  Client name is slugified (spaces→underscores, special chars   ║
 * ║  removed). Falls back to "Client" if name is empty.            ║
 * ╠══════════════════════════════════════════════════════════════════╣
 * ║  PANDOC COMMAND (for the openclaw assistant):                   ║
 * ║  pandoc ROE_ClientName_2025-01-15.md \                         ║
 * ║    -o ROE_ClientName_2025-01-15.pdf \                          ║
 * ║    --template=rooted-tech-template.tex \                       ║
 * ║    --pdf-engine=xelatex                                        ║
 * ║                                                                ║
 * ║  The YAML frontmatter vars (title, subtitle, author, date,     ║
 * ║  geometry, fontsize) map to LaTeX template variables.          ║
 * ╠══════════════════════════════════════════════════════════════════╣
 * ║  ROUTE: /roe-generator                                         ║
 * ║  LINKED FROM: Landing page → Standards & Ethics section        ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Download, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * ROEFields — All fillable fields in the ROE template.
 * Grouped by section:
 *   - Client info (name, POC, IT lead + contact details)
 *   - Assessor info (lead + contact details)
 *   - Scope (networks, domains, web apps, wireless, physical, exclusions)
 *   - Authorized activities (9 boolean toggles)
 *   - Schedule (start/end dates, hours, after-hours, emergency contact)
 */
interface ROEFields {
  // --- Client Information ---
  clientName: string;        // Organization name — used in Purpose + Signatures
  clientPOC: string;         // Point of contact name
  clientPOCPhone: string;    // POC phone number
  clientPOCEmail: string;    // POC email address
  clientITLead: string;      // IT lead name
  clientITPhone: string;     // IT lead phone
  clientITEmail: string;     // IT lead email

  // --- Assessor Information ---
  assessorLead: string;      // Rooted Tech assessor name
  assessorPhone: string;     // Assessor phone
  assessorEmail: string;     // Assessor email

  // --- Scope of Assessment ---
  networks: string;          // In-scope networks/subnets (e.g., "192.168.1.0/24")
  domains: string;           // In-scope domains (e.g., "example.com")
  webApps: string;           // In-scope web applications
  wirelessNetworks: string;  // In-scope wireless SSIDs
  physicalLocations: string; // In-scope physical addresses
  additionalExclusions: string; // Extra out-of-scope items (textarea)

  // --- Testing Window ---
  startDate: string;         // Assessment start date
  endDate: string;           // Assessment end date
  testingHours: string;      // Allowed testing hours (e.g., "Mon–Fri, 8-6 CT")
  afterHoursPermitted: boolean; // Whether after-hours testing is allowed
  emergencyContact: string;  // Emergency contact for critical findings

  // --- Authorized Activities (checkboxes) ---
  extNetScan: boolean;       // External network vulnerability scanning
  intNetScan: boolean;       // Internal network vulnerability scanning
  wirelessAssess: boolean;   // Wireless network assessment
  webAppPentest: boolean;    // Web application penetration testing (OWASP Top 10)
  passwordTest: boolean;     // Password policy and authentication testing
  phishingSim: boolean;      // Phishing simulation (email-based)
  physicalSecurity: boolean; // Physical security assessment (cameras, access control)
  redTeam: boolean;          // Red team operations (requires separate addendum)
  socialEngPhone: boolean;   // Social engineering — phone-based (separate addendum)
}

/** Default values — most activities enabled, red team/SE disabled by default */
const defaultFields: ROEFields = {
  clientName: "",
  clientPOC: "",
  clientPOCPhone: "",
  clientPOCEmail: "",
  clientITLead: "",
  clientITPhone: "",
  clientITEmail: "",
  assessorLead: "",
  assessorPhone: "",
  assessorEmail: "",
  networks: "",
  domains: "",
  webApps: "",
  wirelessNetworks: "",
  physicalLocations: "",
  additionalExclusions: "",
  startDate: "",
  endDate: "",
  testingHours: "Mon–Fri, 8:00 AM – 6:00 PM CT",
  afterHoursPermitted: false,
  emergencyContact: "",
  extNetScan: true,
  intNetScan: true,
  wirelessAssess: true,
  webAppPentest: true,
  passwordTest: true,
  phishingSim: true,
  physicalSecurity: true,
  redTeam: false,
  socialEngPhone: false,
};

/**
 * generateMarkdown — Converts form fields into a complete ROE markdown document.
 *
 * OUTPUT FORMAT:
 * - YAML frontmatter (title, subtitle, author, date, geometry, fontsize)
 *   → These are parsed by pandoc and passed to LaTeX templates as variables
 *   → \today in the date field is a LaTeX command for current date
 * - 10 numbered sections with markdown tables and checklists
 * - Empty fields fall back to placeholder text in [brackets]
 *
 * PANDOC USAGE:
 *   pandoc output.md -o output.pdf --template=your-template.tex --pdf-engine=xelatex
 *
 * @param f — ROEFields object with all form values
 * @returns Complete markdown string ready for download
 */
function generateMarkdown(f: ROEFields): string {
  /** Convert boolean to markdown checkbox syntax */
  const check = (v: boolean) => (v ? "[x]" : "[ ]");
  const afterHours = f.afterHoursPermitted ? "[x] Permitted" : "[ ] Permitted";

  return `---
title: "Rules of Engagement"
subtitle: "Rooted Tech Services — Security Assessment Agreement"
author: "Rooted Tech Services"
date: \\today
geometry: margin=1in
fontsize: 12pt
---

# Rules of Engagement (ROE)

## 1. Purpose

This document defines the scope, boundaries, and authorized activities for a security assessment conducted by **Rooted Tech Services** ("Assessor") on behalf of **${f.clientName || "[CLIENT NAME]"}** ("Client"). All testing will be performed in accordance with this agreement and applicable law.

---

## 2. Scope of Assessment

### 2.1 In-Scope Systems

| Asset Type | Details |
|---|---|
| **Networks/Subnets** | ${f.networks || "[e.g., 192.168.1.0/24]"} |
| **Domains** | ${f.domains || "[e.g., example.com]"} |
| **Web Applications** | ${f.webApps || "[e.g., https://app.example.com]"} |
| **Wireless Networks** | ${f.wirelessNetworks || "[e.g., Corporate SSID]"} |
| **Physical Locations** | ${f.physicalLocations || "[e.g., Main office — 123 Main St, OKC, OK]"} |

### 2.2 Out-of-Scope Systems

The following are **explicitly excluded** from testing:

- Production databases containing live customer PII (unless written exception granted)
- Third-party hosted services not owned by Client
- Denial-of-Service (DoS/DDoS) attacks
- Social engineering of non-consenting individuals
${f.additionalExclusions ? `- ${f.additionalExclusions}` : "- [Additional exclusions as agreed]"}

---

## 3. Authorized Activities

The Assessor is authorized to perform the following:

- ${check(f.extNetScan)} External network vulnerability scanning
- ${check(f.intNetScan)} Internal network vulnerability scanning
- ${check(f.wirelessAssess)} Wireless network assessment
- ${check(f.webAppPentest)} Web application penetration testing (OWASP Top 10)
- ${check(f.passwordTest)} Password policy and authentication testing
- ${check(f.phishingSim)} Phishing simulation (email-based, with prior employee notification)
- ${check(f.physicalSecurity)} Physical security assessment (camera placement, access control review)
- ${check(f.redTeam)} Red team operations (requires separate addendum)
- ${check(f.socialEngPhone)} Social engineering — phone-based (requires separate addendum)

---

## 4. Testing Window

| Parameter | Value |
|---|---|
| **Start Date** | ${f.startDate || "[DATE]"} |
| **End Date** | ${f.endDate || "[DATE]"} |
| **Testing Hours** | ${f.testingHours || "[e.g., Mon–Fri, 8:00 AM – 6:00 PM CT]"} |
| **After-Hours Testing** | ${afterHours} |
| **Emergency Contact** | ${f.emergencyContact || "[Name, Phone, Email]"} |

---

## 5. Communication Protocol

### 5.1 Points of Contact

| Role | Name | Phone | Email |
|---|---|---|---|
| **Client POC** | ${f.clientPOC || "[Name]"} | ${f.clientPOCPhone || "[Phone]"} | ${f.clientPOCEmail || "[Email]"} |
| **Client IT Lead** | ${f.clientITLead || "[Name]"} | ${f.clientITPhone || "[Phone]"} | ${f.clientITEmail || "[Email]"} |
| **Assessor Lead** | ${f.assessorLead || "[Name]"} | ${f.assessorPhone || "[Phone]"} | ${f.assessorEmail || "[Email]"} |

### 5.2 Critical Finding Notification

If a **critical or actively exploited vulnerability** is discovered during testing, the Assessor will:

1. **Immediately pause** testing on the affected system
2. **Notify** the Client POC within **1 hour** via phone
3. **Document** the finding with remediation steps
4. **Resume** testing only after Client acknowledgment

---

## 6. Data Handling

- All assessment data is encrypted in transit (TLS 1.2+) and at rest (AES-256)
- Raw scan data and credentials discovered will be stored on Assessor's secured systems only
- All assessment data will be **destroyed within 90 days** of final report delivery, unless otherwise agreed
- No Client data will be shared with third parties without written consent

---

## 7. Legal Protections

- The Client confirms **legal authority** to authorize this assessment on all in-scope systems
- The Assessor agrees to operate **within the defined scope** at all times
- This agreement does not authorize any activity that violates federal, state, or local law
- The Assessor carries **professional liability insurance** for security assessment services

---

## 8. Reporting & Deliverables

The Assessor will provide:

1. **Executive Summary** — non-technical overview for leadership
2. **Technical Report** — detailed findings with CVSS scores, evidence, and remediation
3. **Remediation Roadmap** — prioritized action items with timeline recommendations
4. **Compliance Mapping** — findings mapped to applicable frameworks (NIST CSF, CIS Controls, Oklahoma SB 626)

**Delivery Timeline:** Final report within **10 business days** of assessment completion.

---

## 9. Frameworks & Standards

All testing follows industry-recognized methodologies:

- **NIST Cybersecurity Framework (CSF)**
- **CIS Controls v8**
- **OWASP Testing Guide v4**
- **PTES (Penetration Testing Execution Standard)**

---

## 10. Signatures

By signing below, both parties agree to the terms outlined in this Rules of Engagement document.

| | |
|---|---|
| **Client Representative** | **Assessor Representative** |
| | |
| _________________________ | _________________________ |
| Name: ${f.clientName || "[CLIENT NAME]"} | Name: ${f.assessorLead || "[ASSESSOR NAME]"} |
| Title: [TITLE] | Title: Security Consultant |
| Date: __________________ | Date: __________________ |

---

*This document is confidential and intended solely for the parties named above.*

*Rooted Tech Services — Oklahoma City, OK — Col 3:23*
`;
}

/**
 * ROEGenerator — Main page component
 *
 * STATE:
 *   fields: ROEFields — all form values
 *   preview: boolean — toggles between edit form and markdown preview
 *
 * HELPER COMPONENTS (defined inline):
 *   Section — Card section header with bottom border
 *   Field   — Label + Input/Textarea bound to a ROEFields key
 *   Toggle  — Checkbox + Label bound to a boolean ROEFields key
 *
 * DOWNLOAD LOGIC:
 *   1. generateMarkdown(fields) → markdown string
 *   2. Create Blob with text/markdown MIME type
 *   3. Create temporary <a> element with download attribute
 *   4. Trigger click to download, then revoke object URL
 */
const ROEGenerator = () => {
  const [fields, setFields] = useState<ROEFields>(defaultFields);
  const [preview, setPreview] = useState(false);

  /** Generic field updater — works for both string and boolean fields */
  const update = (key: keyof ROEFields, value: string | boolean) =>
    setFields((prev) => ({ ...prev, [key]: value }));

  /** Download handler — generates .md file and triggers browser download */
  const downloadMD = () => {
    const md = generateMarkdown(fields);
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    // Slugify client name for filename: "Acme Corp" → "Acme_Corp"
    const clientSlug = fields.clientName
      ? fields.clientName.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_]/g, "")
      : "Client";
    a.href = url;
    a.download = `ROE_${clientSlug}_${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /** Section — Reusable card section with titled header */
  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">{title}</h3>
      {children}
    </div>
  );

  /** Field — Text input or textarea bound to a ROEFields key */
  const Field = ({ label, field, placeholder, textarea }: { label: string; field: keyof ROEFields; placeholder?: string; textarea?: boolean }) => (
    <div className="space-y-1.5">
      <Label className="text-sm text-muted-foreground">{label}</Label>
      {textarea ? (
        <Textarea
          value={fields[field] as string}
          onChange={(e) => update(field, e.target.value)}
          placeholder={placeholder}
          className="bg-secondary/50 border-border"
        />
      ) : (
        <Input
          value={fields[field] as string}
          onChange={(e) => update(field, e.target.value)}
          placeholder={placeholder}
          className="bg-secondary/50 border-border"
        />
      )}
    </div>
  );

  /** Toggle — Checkbox bound to a boolean ROEFields key */
  const Toggle = ({ label, field }: { label: string; field: keyof ROEFields }) => (
    <div className="flex items-center gap-2">
      <Checkbox
        checked={fields[field] as boolean}
        onCheckedChange={(v) => update(field, !!v)}
        className="border-border data-[state=checked]:bg-primary"
      />
      <Label className="text-sm text-foreground cursor-pointer">{label}</Label>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Page header — back button, title, preview/download controls */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                ROE Generator
              </h1>
              <p className="text-sm text-muted-foreground">Fill in the fields → download .md → pandoc + LaTeX it with your brand</p>
            </div>
          </div>
          <div className="flex gap-2">
            {/* Toggle between form edit mode and markdown preview */}
            <Button variant="outline" onClick={() => setPreview(!preview)}>
              {preview ? "Edit" : "Preview"}
            </Button>
            {/* Download button — always available */}
            <Button onClick={downloadMD} className="gap-2">
              <Download className="h-4 w-4" /> Download .md
            </Button>
          </div>
        </div>

        {preview ? (
          /* ============================================================
           *  PREVIEW MODE — Shows generated markdown in a monospace <pre>
           *  Useful for verifying output before downloading.
           *  User can toggle back to "Edit" to make changes.
           * ============================================================ */
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <pre className="whitespace-pre-wrap text-sm text-foreground font-mono leading-relaxed overflow-x-auto">
                {generateMarkdown(fields)}
              </pre>
            </CardContent>
          </Card>
        ) : (
          /* ============================================================
           *  EDIT MODE — Form cards for each ROE section
           *  Cards: Client Info, Assessor Info, Scope, Activities, Schedule
           *  Each card uses the Section/Field/Toggle helper components
           * ============================================================ */
          <div className="space-y-8">

            {/* Card 1: Client Information */}
            <Card className="bg-card border-border">
              <CardContent className="p-6 space-y-6">
                <Section title="Client Information">
                  <Field label="Client / Organization Name" field="clientName" placeholder="Acme Corp" />
                  <div className="grid sm:grid-cols-3 gap-4">
                    <Field label="Client POC" field="clientPOC" placeholder="Jane Doe" />
                    <Field label="Phone" field="clientPOCPhone" placeholder="(405) 555-0100" />
                    <Field label="Email" field="clientPOCEmail" placeholder="jane@acme.com" />
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <Field label="IT Lead" field="clientITLead" placeholder="John Smith" />
                    <Field label="Phone" field="clientITPhone" placeholder="(405) 555-0101" />
                    <Field label="Email" field="clientITEmail" placeholder="john@acme.com" />
                  </div>
                </Section>
              </CardContent>
            </Card>

            {/* Card 2: Assessor Information (Rooted Tech side) */}
            <Card className="bg-card border-border">
              <CardContent className="p-6 space-y-6">
                <Section title="Assessor Information">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <Field label="Assessor Lead" field="assessorLead" placeholder="Your Name" />
                    <Field label="Phone" field="assessorPhone" placeholder="(405) 555-0200" />
                    <Field label="Email" field="assessorEmail" placeholder="you@rootedtech.com" />
                  </div>
                </Section>
              </CardContent>
            </Card>

            {/* Card 3: Scope of Assessment — what systems are being tested */}
            <Card className="bg-card border-border">
              <CardContent className="p-6 space-y-6">
                <Section title="Scope of Assessment">
                  <Field label="Networks / Subnets" field="networks" placeholder="192.168.1.0/24, 10.0.0.0/8" />
                  <Field label="Domains" field="domains" placeholder="example.com, sub.example.com" />
                  <Field label="Web Applications" field="webApps" placeholder="https://app.example.com" />
                  <Field label="Wireless Networks" field="wirelessNetworks" placeholder="Corporate SSID, Guest SSID" />
                  <Field label="Physical Locations" field="physicalLocations" placeholder="123 Main St, OKC, OK" />
                  <Field label="Additional Exclusions" field="additionalExclusions" placeholder="Any systems or areas to exclude..." textarea />
                </Section>
              </CardContent>
            </Card>

            {/* Card 4: Authorized Activities — checkbox toggles */}
            <Card className="bg-card border-border">
              <CardContent className="p-6 space-y-6">
                <Section title="Authorized Activities">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Toggle label="External network vulnerability scanning" field="extNetScan" />
                    <Toggle label="Internal network vulnerability scanning" field="intNetScan" />
                    <Toggle label="Wireless network assessment" field="wirelessAssess" />
                    <Toggle label="Web app penetration testing (OWASP Top 10)" field="webAppPentest" />
                    <Toggle label="Password policy & authentication testing" field="passwordTest" />
                    <Toggle label="Phishing simulation (email-based)" field="phishingSim" />
                    <Toggle label="Physical security assessment" field="physicalSecurity" />
                    <Toggle label="Red team operations (separate addendum)" field="redTeam" />
                    <Toggle label="Social engineering — phone (separate addendum)" field="socialEngPhone" />
                  </div>
                </Section>
              </CardContent>
            </Card>

            {/* Card 5: Testing Window — dates, hours, emergency contact */}
            <Card className="bg-card border-border">
              <CardContent className="p-6 space-y-6">
                <Section title="Testing Window">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Start Date" field="startDate" placeholder="2025-01-15" />
                    <Field label="End Date" field="endDate" placeholder="2025-01-22" />
                  </div>
                  <Field label="Testing Hours" field="testingHours" placeholder="Mon–Fri, 8:00 AM – 6:00 PM CT" />
                  <Toggle label="After-hours testing permitted" field="afterHoursPermitted" />
                  <Field label="Emergency Contact" field="emergencyContact" placeholder="Name, Phone, Email" />
                </Section>
              </CardContent>
            </Card>

            {/* Final download CTA at bottom of form */}
            <div className="flex justify-center pt-4 pb-12">
              <Button onClick={downloadMD} size="lg" className="gap-2 glow-cyan">
                <Download className="h-5 w-5" /> Generate & Download ROE (.md)
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ROEGenerator;
