import Menu from "./components/Menu/Menu";
import Trending from "./components/Trending/Trending";
import Headline from "./components/Headline/Banner";
import BeritaTerbaruPage from "./components/BeritaTerbaru";
import TopikTrending from "./components/TopikTrending/TopikTrending";
import OpiniPage from "./components/Opini/OpiniPage";
import Rekomendasi from "./components/Rekomendasi";
import VideoPage from "./components/Video";

export default function Home() {
  return (
    <>
      <main>
        {/* Main Grid Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-4 md:mt-10 mt-4">
          {/* Left Section: Menu and Latest News (Desktop Only) */}
          <div className="hidden md:block md:col-span-7">
            <Menu />
            <Headline />
            <BeritaTerbaruPage />
          </div>

          {/* Middle Section: Headline (Mobile Only) */}
          <div className="block md:hidden w-full">
            <Menu />
            <Headline />
          </div>

          {/* Latest News for Mobile */}
          <div className="block md:hidden">
            <Trending />

            <BeritaTerbaruPage />
          </div>

          {/* Right Section: Trending (Desktop Only) */}
          <div className="hidden md:block md:col-span-5 ">
            <Trending />
            <TopikTrending />
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
      </main>
    </>
  );
}
