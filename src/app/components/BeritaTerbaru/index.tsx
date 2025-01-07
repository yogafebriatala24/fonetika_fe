import React from "react";
import BeritaTerbaru from "./BeritaTerbaru";
import { fetchBeritaList } from "@/app/libs/ApiDetailBerita";
import { BeritaType } from "@/app/types/BeritaType";

export default async function BeritaTerbaruPage() {
  const listBerita: BeritaType[] = await fetchBeritaList();
  return (
    <>
      <BeritaTerbaru listBerita={listBerita} />
    </>
  );
}
