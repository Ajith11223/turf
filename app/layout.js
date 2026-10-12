import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Gallant Sports — football turf and sports surfaces, built end to end",
  description:
    "Design, build, install and maintain sports surfaces: turf, athletic tracks, interlocking tiles and indoor flooring.",
  openGraph: {
    title: "Gallant Sports",
    description: "We build the surface. You play on it.",
    type: "website"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[999] focus:rounded focus:bg-turf focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
