import React from "react";

import ContentTrending from "./Content";
import { fetchBeritaList } from "@/service/ApiDetailBerita";
import { IconLine } from "@/app/assets/icons";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { ArtikelListType } from "@/types/ArtikelType";

export default async function Trending() {
  const listBerita: ArtikelListType = await fetchBeritaList();

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
          <ContentTrending listBerita={listBerita} />
          <hr className="mt-4" />
        </div>
      </div>
    </>
  );
}
