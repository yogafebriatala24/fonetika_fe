import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const figtree = Figtree({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Fonetika",
  description: "Memberikan Makna Disetiap Berita",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figtree.className}  antialiased`}>
        <Header />
        <div className="md:max-w-2xl lg:max-w-6xl max-w-full   mx-auto">
          {children}
        </div>
        <div className="mt-4">
          <Footer />
        </div>
      </body>
    </html>
  );
}
