import React from "react";
import { fetchBeritaList } from "@/app/api/berita/route";
import ContentHeadline from "./Content";

export default async function Headline() {
  const listBerita = await fetchBeritaList();
  return (
    <>
      <ContentHeadline listBerita={listBerita} />
    </>
  );
}
