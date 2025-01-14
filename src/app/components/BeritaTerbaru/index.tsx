import React from "react";
import BeritaTerbaru from "./BeritaTerbaru";
import { fetchBeritaList } from "@/app/libs/ApiDetailBerita";
import { ArtikelType } from "@/app/types/ArtikelType";

export default async function BeritaTerbaruPage() {
  const listBerita: ArtikelType[] = await fetchBeritaList();

  return (
    <>
      <BeritaTerbaru listBerita={listBerita} />
    </>
  );
}
