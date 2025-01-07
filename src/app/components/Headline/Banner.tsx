import React from "react";
import { fetchBeritaList } from "@/app/api/berita/GetBerita";
import ContentHeadline from "./Content";

export default async function Headline() {
  const listBerita = await fetchBeritaList();
  return (
    <>
      <ContentHeadline listBerita={listBerita} />
    </>
  );
}
