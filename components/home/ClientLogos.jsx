import ImageOrFallback from "@/components/ui/ImageOrFallback";
import { siteImages } from "@/lib/site-images";

const CLIENTS = [
  { name: "Accenture", key: "accenture" },
  { name: "Schneider Electric", key: "schneiderElectric" },
  { name: "PwC", key: "pwc" },
  { name: "DHL", key: "dhl" },
  { name: "Google", key: "google" },
  { name: "Microsoft", key: "microsoft" },
];

export default function ClientLogos() {
  return (
    <section className="border-y border-line">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
        {/* ============================================================
            🖼️  LOGOS GO HERE
            lib/site-images.js → clientLogos.accenture / .schneiderElectric
            / .pwc / .dhl / .google / .microsoft (one key per client below)
           ============================================================ */}
        {CLIENTS.map((client) => (
          <div key={client.name} className="relative h-8 w-28 flex items-center justify-center">
            <ImageOrFallback
              src={siteImages.clientLogos[client.key]}
              alt={client.name}
              className="object-contain opacity-40 hover:opacity-70 transition-opacity"
              fallback={
                <span className="font-display text-lg md:text-xl text-ink/40 hover:text-ink/70 transition-colors tracking-tight">
                  {client.name}
                </span>
              }
            />
          </div>
        ))}
      </div>
    </section>
  );
}
