import React from "react";
import ContentRekomendasi from "./Content";
import { BeritaType } from "@/app/types/BeritaType";
import { fetchBeritaList } from "@/app/libs/ApiDetailBerita";

export default async function Rekomendasi() {
  const listBerita: BeritaType[] = await fetchBeritaList();
  return (
    <>
      <ContentRekomendasi listBerita={listBerita} />
    </>
  );
}
