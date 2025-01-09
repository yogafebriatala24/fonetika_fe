import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Providers } from "./providers";
import { PopupContainer } from "./components/Popup/PopupContainer";

const figtree = Figtree({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
  preload: true,
});

export const metadata: Metadata = {
  title: "Fonetika",
  description: "Memberikan makna disetiap berita",
  icons: "/logo.png ",
  authors: [{ name: "Fonetika Media" }],
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
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figtree.className} antialiased`}>
        <Providers>
          <PopupContainer />
          <Header />
          <div className="md:max-w-2xl lg:max-w-6xl max-w-full mt-[70px] md:mt-28 mx-auto">
            {children}
          </div>
          <div className="mt-4">
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
