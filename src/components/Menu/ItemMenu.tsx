"use client";
import { ArtikelType } from "@/types/ArtikelType";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function ItemMenu({
  listKategori,
}: {
  listKategori: ArtikelType[];
}) {
  const pathname = usePathname();
  return (
    <>
      <div className="flex  overflow-auto items-center border-b p-2 scrollbar">
        {listKategori?.map((data: ArtikelType) => {
          const isActive = pathname === `/detail-kategori/${data.slug}`;
          return (
            <Link
              href={`/detail-kategori/${data.slug}`}
              className={`whitespace-nowrap mx-3 font-medium focus:underline ${
                isActive ? "font-bold" : ""
              }`}
              key={data.slug}
              prefetch={true}
            >
              {data.nama}
            </Link>
          );
        })}
      </div>
    </>
  );
}
