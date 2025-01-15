import Menu from "../components/Menu/Menu";
import Trending from "../components/Trending/Trending";
import Headline from "../components/Headline/Banner";
import BeritaTerbaruPage from "../components/BeritaTerbaru";
import TopikTrending from "../components/TopikTrending/TopikTrending";
import OpiniPage from "../components/Opini/OpiniPage";
import Rekomendasi from "../components/Rekomendasi";
import VideoPage from "../components/Video";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Fonetika",
  description: "Memberikan makna disetiap berita",
  icons: "/logo.png ",
  authors: [{ name: "Fonetika Media" }],
  openGraph: {
    title: "Fonetika",
    description: "Memberikan makna disetiap berita",
    url: "https://yogafebriatala.cloud/",
    siteName: "Fonetika",
    images: [
      {
        url: "https://yogafebriatala.cloud/logo.png",
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
    images: ["https://yogafebriatala.cloud/logo.png"],
  },
  facebook: {
    admins: ["Fonetika"],
  },
};

export default function Home() {
  return (
    <>
      <main>
        {/* Main Grid Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-4  lg:mt-20 mt-[70px]">
          {/* Left Section: Menu and Latest News (Desktop Only) */}
          <div className="hidden lg:block lg:col-span-7">
            <Menu />
            <Headline />
            <BeritaTerbaruPage />
          </div>

          {/* Middle Section: Headline (Mobile Only) */}
          <div className="block lg:hidden w-full">
            <Menu />
            <Headline />
          </div>

          {/* Latest News for Mobile */}
          <div className="block lg:hidden">
            <Trending />

            <BeritaTerbaruPage />
          </div>

          {/* Right Section: Trending (Desktop Only) */}
          <div className="hidden lg:block lg:col-span-5 sticky-wrapper">
            <div id="trending-section" className="sticky top-20">
              <Trending />
              <TopikTrending />
            </div>
          </div>
        </section>
        <section className="mt-4">
          <VideoPage />
          <Rekomendasi />
          <TopikTrending />
        </section>
        <section>
          <OpiniPage />
        </section>
        {/* Muncul Popup disini*/}
      </main>
    </>
  );
}
