import React from "react";

import ContentTrending from "./Content";
import { fetchBeritaList } from "@/app/libs/ApiDetailBerita";
import { BeritaType } from "@/app/types/BeritaType";
import { IconLine } from "@/app/assets/icons";

export default async function Trending() {
  const listBerita: BeritaType[] = await fetchBeritaList();
  const maxItems = 4;
  const limitedBerita = listBerita?.slice(0, maxItems);
  return (
    <>
      <div className=" mx-4  rounded-xl  ">
        <div className=" text-primary text-xl  font-bold">
          Trending
          <span className="mt-2">
            <IconLine />
          </span>
        </div>
        <div className="mt-4">
          <ContentTrending listBerita={limitedBerita} />
          <hr className="mt-4" />
        </div>
      </div>
    </>
  );
}
