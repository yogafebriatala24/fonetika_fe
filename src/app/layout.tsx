import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const figtree = Figtree({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
  preload: true,
});

export const metadata: Metadata = {
  title: "Fonetika",
  description: "Memberikan makna disetiap berita",
  icons: "/logo.png",
  // viewport: "width=device-width, initial-scale=1",
  // authors: [{ name: "Fonetika" }],
  openGraph: {
    title: "Fonetika",
    description: "Memberikan makna disetiap berita",
    url: "https://fonetika-fe.netlify.app/",
    siteName: "Fonetika",
    images: [
      {
        url: "https://fonetika-fe.vercel.app/logo.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en-ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fonetika",
    description: "Memberikan makna disetiap berita",
    images: ["https://fonetika-fe.netlify.app/logo.png"],
  },
  facebook: {
    admins: ["Fonetika"],
  },
  // robots: {
  //   index: true,
  //   follow: true,
  //   nocache: true,
  //   googleBot: {
  //     index: true,
  //     follow: true,
  //     noimageindex: true,
  //     "max-video-preview": -1,
  //     "max-image-preview": "large",
  //     "max-snippet": -1,
  //   },
  // },
  // keywords: [
  //   "Fonetika",
  //   "Fonetika Indonesia",
  //   "Fonetika Indonesia Berita",
  //   "Fonetika Indonesia Berita Terbaru",
  //   "Fonetika Indonesia Berita Terbaru Terkini",
  //   "Fonetika Indonesia Berita Terbaru Terkini Terbaru",
  //   "Fonetika Indonesia Berita Terbaru Terkini Terbaru Terkini",
  //   "Fonetika Indonesia Berita Terbaru Terkini Terbaru Terkini Terbaru",
  // ],
  // publisher: "Fonetika",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figtree.className}  antialiased`}>
        <Header />
        <div className="md:max-w-2xl lg:max-w-6xl max-w-full mt-[70px] md:mt-28   mx-auto">
          {children}
        </div>
        <div className="mt-4">
          <Footer />
        </div>
      </body>
    </html>
  );
}
