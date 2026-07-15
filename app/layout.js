import "./globals.css";
import SmoothScroll from "@/components/shared/SmoothScroll";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import CustomCursor from "@/components/shared/CustomCursor";

export const metadata = {
  title: "Imagenie — Building Brands That Lead Markets",
  description:
    "We help ambitious businesses transform strategy into measurable growth through Brand Strategy, Go-to-Market Planning, Creative Design, Digital Experiences, Content Strategy, and Digital Marketing.",
};

/**
 * Root layout: html shell, global fonts, and app-wide providers only.
 * Page chrome (header/footer/rails) lives in each route group's own layout
 * — see app/(website)/layout.jsx and app/(dashboard)/layout.jsx.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=Baloo+2:wght@600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
        <CustomCursor />
      </body>
    </html>
  );
}
