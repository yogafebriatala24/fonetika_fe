import React from "react";
import ContentRekomendasi from "./Content";
import { BeritaType } from "@/types/BeritaType";
import {
  fetchBeritaList,
  fetchBeritaRekomendasi,
} from "@/service/ApiDetailBerita";
import { ArtikelListType, ArtikelType } from "@/types/ArtikelType";

export default async function Rekomendasi() {
  const listRekomendasi = await fetchBeritaRekomendasi();
  return (
    <>
      <ContentRekomendasi listBerita={listRekomendasi} />
    </>
  );
}
