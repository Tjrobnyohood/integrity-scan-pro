import { Heart } from "lucide-react";

const OKCHelpingHandsBadge = () => (
  <section className="max-w-6xl mx-auto px-4 py-8">
    <a
      href="https://okc-helping-hands.vercel.app"
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 rounded-lg border border-primary/20 bg-card/50 px-6 py-4 hover:border-primary/40 transition-colors group">
        <Heart className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
        <p className="text-sm text-muted-foreground text-center">
          Proud partner of{" "}
          <span className="font-semibold text-foreground">OKC Helping Hands</span>
          {" "}— dedicated to protecting our most vulnerable populations.
        </p>
      </div>
    </a>
  </section>
);

export default OKCHelpingHandsBadge;
