import React from "react";
import ContentRekomendasi from "./Content";
import { BeritaType } from "@/types/BeritaType";
import { fetchBeritaList } from "@/service/ApiDetailBerita";
import { ArtikelListType, ArtikelType } from "@/types/ArtikelType";

export default async function Rekomendasi() {
  const listBerita = await fetchBeritaList();
  return (
    <>
      <ContentRekomendasi listBerita={listBerita} />
    </>
  );
}
