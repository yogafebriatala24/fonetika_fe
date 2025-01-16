import { fetchKategori } from "@/service/ApiKategori";
import { ArtikelType } from "@/types/ArtikelType";
import React from "react";
import ItemMenu from "./ItemMenu";

export default async function Menu() {
  const listKategori: ArtikelType[] = await fetchKategori();
  return (
    <>
      <ItemMenu listKategori={listKategori} />
    </>
  );
}
