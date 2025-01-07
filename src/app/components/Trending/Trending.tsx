import React from "react";

import ContentTrending from "./Content";
import { fetchBeritaList } from "@/app/libs/ApiDetailBerita";

export default async function Trending() {
  const listBerita = await fetchBeritaList();
  const maxItems = 4;
  const limitedBerita = listBerita?.slice(0, maxItems);
  return (
    <>
      <div className="mx-4  rounded-xl p-2 ">
        <div className="flex items-center gap-2 text-primary text-xl  font-bold">
          Trending
        </div>
        <div className="mt-4">
          <ContentTrending listBerita={limitedBerita} />
        </div>
      </div>
    </>
  );
}
