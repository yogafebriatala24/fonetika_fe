import React from "react";
import BeritaTerbaru from "./BeritaTerbaru";
import { fetchBeritaList } from "@/service/ApiDetailBerita";
import { ArtikelListType, ArtikelType } from "@/types/ArtikelType";
import { IconLine } from "@/app/assets/icons";

export default async function BeritaTerbaruPage() {
  const listBerita: ArtikelListType = await fetchBeritaList();

  return (
    <>
      <div className="mt-4 mx-4">
        <div className="flex items-center gap-2 text-primary text-xl font-bold">
          <div className="w-full">
            <h4>Terbaru</h4>
            <span className="mt-2">
              <IconLine />
            </span>
          </div>
        </div>
        <BeritaTerbaru initialListBerita={listBerita} />
      </div>
    </>
  );
}
