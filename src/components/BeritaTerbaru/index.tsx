import React from "react";
import BeritaTerbaru from "./BeritaTerbaru";
import { fetchBeritaList } from "@/service/ApiDetailBerita";
import { ArtikelListType, ArtikelType } from "@/types/ArtikelType";

export default async function BeritaTerbaruPage() {
  const listBerita: ArtikelListType = await fetchBeritaList();

  return (
    <>
      <BeritaTerbaru initialListBerita={listBerita} />
    </>
  );
}
