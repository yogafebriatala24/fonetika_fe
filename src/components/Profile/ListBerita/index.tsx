import BeritaTerbaru from "@/components/BeritaTerbaru/BeritaTerbaru";
import { fetchBeritaList } from "@/service/ApiDetailBerita";
import { ArtikelListType } from "@/types/ArtikelType";
import React from "react";

export default async function ListBeritaUser() {
  const listBerita: ArtikelListType = await fetchBeritaList();
  return (
    <>
      <div className="mt-4">
        <BeritaTerbaru initialListBerita={listBerita} />
      </div>
    </>
  );
}
