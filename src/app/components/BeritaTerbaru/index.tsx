import React from "react";
import BeritaTerbaru from "./BeritaTerbaru";
import { fetchBeritaList } from "@/app/libs/ApiDetailBerita";

export default async function BeritaTerbaruPage() {
  const listBerita = await fetchBeritaList();
  return (
    <>
      <BeritaTerbaru listBerita={listBerita} />
    </>
  );
}
export const revalidate = 90;
