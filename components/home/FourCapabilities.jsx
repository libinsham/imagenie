import { Target, PenTool, FileSearch, LayoutTemplate, ArrowRight, ChevronRight } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";

const CAPABILITIES = [
  {
    n: "01",
    icon: Target,
    title: "GTM Strategy & Positioning",
    tag: "Sharper positioning. Clearer market direction.",
    desc: "We develop GTM strategy, messaging, buyer journeys, and launch plans grounded in research and market realities.",
    iconBg: "bg-gradient-to-br from-orange-pale to-orange-soft/30",
  },
  {
    n: "02",
    icon: PenTool,
    title: "Brand & Identity",
    tag: "Brands people recognise, trust, and choose.",
    desc: "We create visual and verbal identity systems designed to scale across markets and touchpoints.",
    iconBg: "bg-ink",
    dark: true,
  },
  {
    n: "03",
    icon: FileSearch,
    title: "Content, Research & Thought Leadership",
    tag: "Content that builds authority.",
    desc: "We produce research-led whitepapers, reports, articles, infographics, and enablement assets that earn attention and credibility.",
    iconBg: "bg-gradient-to-br from-orange-pale to-orange-soft/30",
  },
  {
    n: "04",
    icon: LayoutTemplate,
    title: "Creative & Campaigns",
    tag: "Design that makes strategy visible.",
    desc: "We create websites, landing pages, social content, ads, decks, packaging, and collateral across digital and print.",
    iconBg: "bg-gradient-to-br from-orange to-orange-soft",
  },
];

export default function FourCapabilities() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-start justify-between gap-8 mb-4">
          <div>
            <div className="eyebrow mb-3">04 &nbsp;|&nbsp; WHAT WE DO</div>
            <h2 className="font-headline font-extrabold text-3xl md:text-[2.6rem] leading-[1.1] max-w-xl">
              Four capabilities.
              <br />
              One <span className="text-orange">growth-focused</span> system.
            </h2>
            <p className="text-stone text-[15px] leading-relaxed mt-4 max-w-md">
              From strategy to storytelling, we build the systems, assets, and
              campaigns that drive measurable growth.
            </p>
          </div>

          {/* decorative sphere + arrow, desktop only */}
          <div className="hidden md:flex relative w-32 h-32 shrink-0 items-center justify-center">
            <div
              className="absolute w-20 h-20 rounded-full"
              style={{ background: "radial-gradient(circle at 32% 28%, #FFC57A, #FF9600 55%, #E35800 85%)" }}
            />
            <div className="absolute top-0 right-0 w-12 h-12 rounded-full bg-white border border-line shadow-md flex items-center justify-center">
              <ArrowRight size={16} className="text-orange" />
            </div>
            <span className="absolute bottom-2 left-0 w-2.5 h-2.5 rounded-full bg-ink" />
          </div>
        </div>

        <ScrollReveal
          as="div"
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
          stagger={0.12}
        >
          {CAPABILITIES.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.n}
                className="relative rounded-2xl border border-line bg-surface shadow-sm hover:shadow-lg transition-shadow p-6 pt-8 flex flex-col"
              >
                {/* numbered ribbon */}
                <span className="absolute top-0 left-0 w-11 h-11 bg-orange text-white text-xs font-bold flex items-start justify-start pl-2 pt-1.5 rounded-tl-2xl rounded-br-2xl">
                  {cap.n}
                </span>

                <div className={`w-16 h-16 rounded-2xl ${cap.iconBg} flex items-center justify-center mb-5 mt-2`}>
                  <Icon size={26} className={cap.dark ? "text-orange-soft" : "text-orange"} />
                </div>

                <h3 className="font-headline font-bold text-lg leading-snug">{cap.title}</h3>
                <p className="text-orange text-[13px] font-semibold mt-2 leading-snug">{cap.tag}</p>
                <p className="text-stone text-[13.5px] leading-relaxed mt-2 flex-1">{cap.desc}</p>

                <button
                  aria-label={`Learn more about ${cap.title}`}
                  className="mt-5 w-9 h-9 rounded-full border border-line flex items-center justify-center hover:border-orange hover:text-orange transition-colors self-end"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
}
