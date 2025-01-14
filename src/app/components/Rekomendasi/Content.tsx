import { IconLine } from "@/app/assets/icons";
import { ArtikelType } from "@/app/types/ArtikelType";
import { BeritaType } from "@/app/types/BeritaType";
import { formatDateSecond } from "@/app/utils/FormatDate";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { RiVerifiedBadgeFill } from "react-icons/ri";

export default function ContentRekomendasi({
  listBerita,
}: {
  listBerita: ArtikelType[];
}) {
  return (
    <>
      <div className=" p-4">
        <h1 className="font-bold text-primary text-xl">Rekomendasi</h1>
        <IconLine />

        <div className="grid grid-cols-12 gap-4 mt-4">
          {listBerita.map((data) => (
            <div
              className="col-span-12 md:col-span-6 lg:col-span-4"
              key={data.slug}
            >
              <Image
                src={data.url_image}
                alt="rekomendasi"
                width={150}
                height={10}
                className="w-full h-[200px] object-cover rounded hover:scale-105 transition-transform duration-300 ease-in-out"
              />
              <div className="flex items-center gap-2 text-[13px] mb-2 mt-2">
                <h1 className="flex items-center gap-1 font-medium">
                  <FaUserCircle />
                  FonetikaSPORT
                  <span className="text-primary">
                    <RiVerifiedBadgeFill />
                  </span>
                </h1>
              </div>
              <p className="mt-2 mb-2 text-[11px] text-gray-400">
                {formatDateSecond(data.created_at)}
              </p>
              <Link
                href={`/detail-berita/${data.slug}`}
                className=" font-semibold text-lg focus:underline"
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
