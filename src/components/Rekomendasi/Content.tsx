import { IconLine } from "@/app/assets/icons";
import { ArtikelListType, ArtikelType } from "@/types/ArtikelType";
import { BeritaType } from "@/types/BeritaType";
import { formatDateSecond } from "@/utils/FormatDate";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { RiVerifiedBadgeFill } from "react-icons/ri";

export default function ContentRekomendasi({
  listBerita,
}: {
  listBerita: ArtikelListType;
}) {
  return (
    <>
      <div className=" p-4">
        <h1 className="font-bold text-primary text-xl">Rekomendasi</h1>
        <IconLine />

        <div className="grid grid-cols-12 gap-4 mt-4">
          {listBerita.data.map((data) => (
            <div
              className="col-span-12 md:col-span-6 lg:col-span-4"
              key={data.slug}
            >
              <Link prefetch={true} href={`/detail-berita/${data.slug}`}>
                <Image
                  src={data.url_image}
                  alt="rekomendasi"
                  width={150}
                  height={10}
                  className="w-full h-[200px] object-cover rounded hover:scale-105 transition-transform duration-300 ease-in-out"
                />
              </Link>
              <div className="flex items-center gap-2 text-[13px] mb-1 mt-2">
                <h1 className="flex items-center gap-1 font-medium">
                  <FaUserCircle />
                  FonetikaSPORT
                  <span className="text-primary">
                    <RiVerifiedBadgeFill />
                  </span>
                </h1>
              </div>
              <div className="flex items-center gap-2 text-[12px] text-gray-400">
                <span>{formatDateSecond(data.created_at)}</span>{" "}
                <span className="font-semibold text-primary">
                  {data.kategori.nama}
                </span>
              </div>
              <Link
                prefetch={true}
                href={`/detail-berita/${data.slug}`}
                className=" font-semibold text-lg focus:underline mt-2 line-clamp-2"
              >
                {data.nama}
              </Link>
              <hr className="mt-2 mb-2" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
