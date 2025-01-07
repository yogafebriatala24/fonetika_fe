import BeritaTerbaru from "./components/BeritaTerbaru/BeritaTerbaru";
import Menu from "./components/Menu/Menu";
import Trending from "./components/Trending/Trending";
import Headline from "./components/Headline/Banner";

export default function Home() {
  return (
    <>
      <section className="grid grid-col-1 md:grid-cols-12  gap-2 md:mt-10 mt-4  md:mx-0">
        <div className="md:col-span-7 md:block hidden">
          <Menu />
          <BeritaTerbaru />
        </div>
        <div className="sm:block md:hidden w-screen">
          <Menu />

          <Headline />
        </div>
        <div className="sm:block md:hidden">
          <BeritaTerbaru />
          <hr className="mt-4" />
        </div>
        <div className="md:col-span-5 ">
          <Trending />
        </div>
      </section>
    </>
  );
}

export const dynamic = "force-dynamic";
