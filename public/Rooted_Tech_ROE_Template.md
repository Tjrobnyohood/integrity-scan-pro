---
title: "Rules of Engagement"
subtitle: "Rooted Tech Services — Security Assessment Agreement"
author: "Rooted Tech Services"
date: \today
geometry: margin=1in
fontsize: 12pt
---

# Rules of Engagement (ROE)

## 1. Purpose

This document defines the scope, boundaries, and authorized activities for a security assessment conducted by **Rooted Tech Services** ("Assessor") on behalf of **[CLIENT NAME]** ("Client"). All testing will be performed in accordance with this agreement and applicable law.

---

## 2. Scope of Assessment

### 2.1 In-Scope Systems

| Asset Type | Details |
|---|---|
| **Networks/Subnets** | [e.g., 192.168.1.0/24] |
| **Domains** | [e.g., example.com] |
| **Web Applications** | [e.g., https://app.example.com] |
| **Wireless Networks** | [e.g., Corporate SSID] |
| **Physical Locations** | [e.g., Main office — 123 Main St, OKC, OK] |

### 2.2 Out-of-Scope Systems

The following are **explicitly excluded** from testing:

- Production databases containing live customer PII (unless written exception granted)
- Third-party hosted services not owned by Client
- Denial-of-Service (DoS/DDoS) attacks
- Social engineering of non-consenting individuals
- [Additional exclusions as agreed]

---

## 3. Authorized Activities

The Assessor is authorized to perform the following:

- [x] External network vulnerability scanning
- [x] Internal network vulnerability scanning
- [x] Wireless network assessment
- [x] Web application penetration testing (OWASP Top 10)
- [x] Password policy and authentication testing
- [x] Phishing simulation (email-based, with prior employee notification)
- [x] Physical security assessment (camera placement, access control review)
- [ ] Red team operations (requires separate addendum)
- [ ] Social engineering — phone-based (requires separate addendum)

---

## 4. Testing Window

| Parameter | Value |
|---|---|
| **Start Date** | [DATE] |
| **End Date** | [DATE] |
| **Testing Hours** | [e.g., Mon–Fri, 8:00 AM – 6:00 PM CT] |
| **After-Hours Testing** | [ ] Permitted / [ ] Not Permitted |
| **Emergency Contact** | [Name, Phone, Email] |

---

## 5. Communication Protocol

### 5.1 Points of Contact

| Role | Name | Phone | Email |
|---|---|---|---|
| **Client POC** | [Name] | [Phone] | [Email] |
| **Client IT Lead** | [Name] | [Phone] | [Email] |
| **Assessor Lead** | [Name] | [Phone] | [Email] |

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

\vspace{1.5cm}

| | |
|---|---|
| **Client Representative** | **Assessor Representative** |
| | |
| _________________________ | _________________________ |
| Name: [CLIENT NAME] | Name: [ASSESSOR NAME] |
| Title: [TITLE] | Title: Security Consultant |
| Date: __________________ | Date: __________________ |

---

*This document is confidential and intended solely for the parties named above.*

*Rooted Tech Services — Oklahoma City, OK — Col 3:23*
