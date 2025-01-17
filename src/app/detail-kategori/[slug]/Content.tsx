import { KategoriListType } from "@/types/KategoriListType";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ContentDetailKategori({
  listKategori,
}: {
  listKategori: KategoriListType[];
}) {
  return (
    <>
      <div className="mt-[100px]">
        {listKategori.map((data) => (
          <div
            className="grid grid-cols-12 items-center gap-4 mx-4 lg:mx-0"
            key={data.slug}
          >
            <div className="lg:col-span-2 mt-4 col-span-4">
              <Image
                src={data.url_image}
                alt={data.nama}
                width={100}
                height={100}
                className="w-full lg:h-[120px] h-[90px] object-cover rounded hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </div>
            <div className="lg:col-span-10 col-span-8">
              <Link
                href={`/detail-berita/${data.slug}`}
                className="font-bold  lg:text-xl"
              >
                {data.nama}
              </Link>
            </div>
            <div className="col-span-12">
              <hr className="w-full" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
