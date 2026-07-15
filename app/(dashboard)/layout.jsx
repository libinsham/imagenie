import Link from "next/link";

const NAV = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Users", href: "/dashboard/users" },
  { label: "Blogs", href: "/dashboard/blogs" },
  { label: "Services", href: "/dashboard/services" },
  { label: "Portfolio", href: "/dashboard/portfolio" },
  { label: "Careers", href: "/dashboard/careers" },
  { label: "Settings", href: "/dashboard/settings" },
];

/**
 * Admin chrome — separate from the public site's Header/Footer.
 * NOTE: these dashboard routes are NOT auth-gated yet. Add that in
 * middleware.js (see the TODO there) before deploying this anywhere real.
 */
export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-paper text-ink">
      <aside className="w-60 shrink-0 border-r border-line px-5 py-8">
        <div className="font-display font-semibold text-lg mb-8">
          IMA<span className="text-orange">G</span>ENIE <span className="text-stone text-xs font-body font-normal">/admin</span>
        </div>
        <nav className="flex flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium px-3 py-2 rounded-lg hover:bg-surface-2 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
