import { fetchKategori } from "@/app/libs/ApiKategori";
import { BeritaType } from "@/app/types/BeritaType";
import Link from "next/link";
import React from "react";

export const revalidate = 30;
export default async function Menu() {
  const listKategori = await fetchKategori();
  return (
    <>
      <div className="flex  overflow-auto items-center border-b p-2 ">
        {listKategori?.map((data: BeritaType) => (
          <Link href={"/"} className="whitespace-nowrap mx-3" key={data.slug}>
            {data.nama}
          </Link>
        ))}
      </div>
    </>
  );
}
