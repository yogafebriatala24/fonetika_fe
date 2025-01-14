import React from "react";
import ContentRekomendasi from "./Content";
import { BeritaType } from "@/app/types/BeritaType";
import { fetchBeritaList } from "@/app/libs/ApiDetailBerita";
import { ArtikelType } from "@/app/types/ArtikelType";

export default async function Rekomendasi() {
  const listBerita: ArtikelType[] = await fetchBeritaList();
  return (
    <>
      <ContentRekomendasi listBerita={listBerita} />
    </>
  );
}
