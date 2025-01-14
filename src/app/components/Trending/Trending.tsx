import React from "react";

import ContentTrending from "./Content";
import { fetchBeritaList } from "@/app/libs/ApiDetailBerita";
import { BeritaType } from "@/app/types/BeritaType";
import { IconLine } from "@/app/assets/icons";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { ArtikelType } from "@/app/types/ArtikelType";

export default async function Trending() {
  const listBerita: ArtikelType[] = await fetchBeritaList();
  const maxItems = 4;
  const limitedBerita = listBerita?.slice(0, maxItems);
  return (
    <>
      <div className=" mx-4  rounded-xl  ">
        <div className=" text-primary text-xl flex items-center   font-bold">
          <div className="">
            Populer
            <span className="mt-2">
              <IconLine />
            </span>
          </div>
          <p className="ms-auto text-sm font-normal flex items-center gap-2">
            Lihat semua{" "}
            <span className="text-xs">
              <FaArrowUpRightFromSquare />
            </span>
          </p>
        </div>
        <div className="mt-4">
          <ContentTrending listBerita={limitedBerita} />
          <hr className="mt-4" />
        </div>
      </div>
    </>
  );
}
