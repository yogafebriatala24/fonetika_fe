import React from "react";
import Image from "next/image";
import { ArtikelListType, ArtikelTerkaitType } from "@/types/ArtikelType";
import { IconLine } from "@/app/assets/icons";

export default function BeritaTerkait({
  artikelTerkait,
}: {
  artikelTerkait: ArtikelListType;
}) {
  return (
    <div className="col-span-12 mt-4 mb-4 mx-4 lg:mx-0">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 mb-2">
          <h1 className="font-bold text-primary text-xl">Berita Terkait</h1>
          <IconLine />
        </div>
        {artikelTerkait.data.map((data) => (
          <div
            className="lg:col-span-3 md:col-span-4 col-span-12"
            key={data.slug}
          >
            <Image
              src={data.url_image}
              alt={data.image}
              width={100}
              height={100}
              className="w-full rounded h-40 object-cover"
            />
            <p className="mt-2 font-medium line-clamp-2">{data.nama}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
