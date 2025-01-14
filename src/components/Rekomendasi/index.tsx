import React from "react";
import ContentRekomendasi from "./Content";
import { BeritaType } from "@/types/BeritaType";
import { fetchBeritaList } from "@/service/ApiDetailBerita";
import { ArtikelType } from "@/types/ArtikelType";

export default async function Rekomendasi() {
  const listBerita: ArtikelType[] = await fetchBeritaList();
  return (
    <>
      <ContentRekomendasi listBerita={listBerita} />
    </>
  );
}
