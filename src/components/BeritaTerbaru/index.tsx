import React from "react";
import BeritaTerbaru from "./BeritaTerbaru";
import { fetchBeritaList } from "@/service/ApiDetailBerita";
import { ArtikelType } from "@/types/ArtikelType";

export default async function BeritaTerbaruPage() {
  const listBerita: ArtikelType[] = await fetchBeritaList();

  return (
    <>
      <BeritaTerbaru listBerita={listBerita} />
    </>
  );
}
