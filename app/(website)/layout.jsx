import Header from "@/components/layout/Header";
import SideRails from "@/components/layout/SideRails";
import Footer from "@/components/layout/Footer";

/**
 * Shared chrome for every public marketing page (home, about, services,
 * portfolio, careers, blog, contact, legal pages). The dashboard route
 * group has its own separate layout with admin chrome instead.
 */
export default function WebsiteLayout({ children }) {
  return (
    <>
      <Header />
      <SideRails />
      <main>{children}</main>
      <Footer />
    </>
  );
}
