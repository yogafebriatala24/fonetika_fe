import { fetchKategori } from "@/app/libs/ApiKategori";
import { BeritaType } from "@/app/types/BeritaType";
import Link from "next/link";
import React from "react";

export default async function Menu() {
  const listKategori: BeritaType[] = await fetchKategori();
  return (
    <>
      <div className="flex  overflow-auto items-center border-b p-2 scrollbar">
        {listKategori?.map((data: BeritaType) => (
          <Link
            href={"/"}
            className="whitespace-nowrap mx-3 font-medium hover:text-gray-600"
            key={data.slug}
          >
            {data.nama}
          </Link>
        ))}
      </div>
    </>
  );
}
