export const metadata = {
  title: "Our Works — Imagenie",
};

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 pt-40 pb-32 text-center">
      <div className="eyebrow mb-3">Portfolio</div>
      <h1 className="font-display font-semibold text-4xl md:text-5xl mb-5">Our Works</h1>
      <p className="text-stone text-[15px] leading-relaxed max-w-lg mx-auto">
        The full portfolio grid lives on the homepage for now (see Our Works section) — this route is reserved for a dedicated, filterable version.
      </p>
    </div>
  );
}
