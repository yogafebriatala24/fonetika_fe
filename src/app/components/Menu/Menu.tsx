import { fetchKategoriList } from "@/app/api/kategori/route";
import Link from "next/link";
import React from "react";

export default async function Menu() {
  const listKategori = await fetchKategoriList();
  return (
    <>
      <div className="flex  overflow-auto items-center border-b p-2 ">
        {listKategori?.map((data) => (
          <Link href={"#"} className="whitespace-nowrap mx-3" key={data.slug}>
            {data.nama}
          </Link>
        ))}
      </div>
    </>
  );
}
