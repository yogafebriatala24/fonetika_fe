import { fetchKategori } from "@/app/libs/ApiKategori";
import { ArtikelType } from "@/app/types/ArtikelType";
import { BeritaType } from "@/app/types/BeritaType";
import Link from "next/link";
import React from "react";

export default async function Menu() {
  const listKategori: ArtikelType[] = await fetchKategori();
  return (
    <>
      <div className="flex  overflow-auto items-center border-b p-2 scrollbar">
        {listKategori?.map((data: ArtikelType) => (
          <Link
            href={"/"}
            className="whitespace-nowrap mx-3 font-medium focus:underline"
            key={data.slug}
          >
            {data.nama}
          </Link>
        ))}
      </div>
    </>
  );
}
