/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  FEATURED PARTNERS SECTION — Community Spotlight               ║
 * ╠══════════════════════════════════════════════════════════════════╣
 * ║  PURPOSE:                                                      ║
 * ║  Showcases small businesses and nonprofits that Rooted Tech    ║
 * ║  partners with. Part of the OKC Helping Hands marketing        ║
 * ║  network to boost visibility for local organizations.          ║
 * ╠══════════════════════════════════════════════════════════════════╣
 * ║  LAYOUT:                                                       ║
 * ║  - Responsive grid: 1 col mobile, 2 col sm, 3 col lg          ║
 * ║  - Each card: 16:9 image area + name/type badge + description  ║
 * ║  - Optional external link with icon                            ║
 * ╠══════════════════════════════════════════════════════════════════╣
 * ║  HOW TO ADD A NEW PARTNER:                                     ║
 * ║  1. Import their logo/image:                                   ║
 * ║     import myLogo from "@/assets/partner-name.jpg";            ║
 * ║  2. Add an entry to the partners[] array below                 ║
 * ║  3. Required fields: name, description, type                   ║
 * ║  4. Optional fields: image (imported file), url (website)      ║
 * ║  5. type must be "business" or "nonprofit"                     ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Store } from "lucide-react";
import pinePantryLogo from "@/assets/pine-pantry.jpg";

/** Partner data shape */
interface Partner {
  name: string;         // Display name of the business/org
  description: string;  // 1-2 sentence pitch about what they do
  type: "business" | "nonprofit"; // Determines badge color/text
  image?: string;       // Imported image file (use: import x from "@/assets/x.jpg")
  url?: string;         // External website URL (optional)
}

/**
 * ╔══════════════════════════════════════════════════════╗
 * ║  FEATURED PARTNERS — ADD NEW ENTRIES BELOW          ║
 * ╠══════════════════════════════════════════════════════╣
 * ║  1. Import logo: import logo from "@/assets/X.jpg"  ║
 * ║  2. Add object to the array below                   ║
 * ║  3. Fields:                                         ║
 * ║     name:        Business/org name                  ║
 * ║     description: 1-2 sentence pitch                 ║
 * ║     type:        "business" | "nonprofit"           ║
 * ║     image:       imported logo (optional)           ║
 * ║     url:         website link (optional)            ║
 * ╚══════════════════════════════════════════════════════╝
 */
const partners: Partner[] = [
  {
    name: "Pine Pantry",
    description: "Community food pantry serving families across the OKC metro area with dignity and care.",
    type: "nonprofit",
    image: pinePantryLogo,
  },
  // --- TEMPLATE: Copy, uncomment, and fill in ---
  // {
  //   name: "Business Name",
  //   description: "What they do and why they matter.",
  //   type: "business",
  //   image: importedLogo,
  //   url: "https://example.com",
  // },
];

const FeaturedPartnersSection = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      {/* Section header with icon badge */}
      <div className="text-center mb-10">
        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Store className="inline h-4 w-4 mr-1" />
          Community Spotlight
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Featured <span className="text-gradient-cyan">Partners</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Small businesses and nonprofits making a difference in Oklahoma. We're proud to stand alongside them.
        </p>
      </div>

      {/* Partner cards grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {partners.map((partner) => (
          <Card
            key={partner.name}
            className="bg-card border-border hover:border-primary/40 transition-all group overflow-hidden"
          >
            {/* Image area — 16:9 aspect ratio, falls back to Store icon if no image */}
            <div className="aspect-[16/9] bg-muted flex items-center justify-center overflow-hidden">
              {partner.image ? (
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <Store className="h-12 w-12 text-muted-foreground/30" />
              )}
            </div>
            <CardContent className="p-5">
              {/* Name + type badge row */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-foreground">{partner.name}</h3>
                {/* Badge: "business" or "nonprofit" — styled with primary color */}
                <span className="text-[10px] uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  {partner.type}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{partner.description}</p>
              {/* Optional external link */}
              {partner.url && (
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                >
                  Visit <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPartnersSection;
