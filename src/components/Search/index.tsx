import { ArtikelListType } from "@/types/ArtikelType";
import { formatDateSecond } from "@/utils/FormatDate";
import { ar } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import Trending from "../Trending/Trending";

export default function Search({
  searchList,
  query,
}: {
  searchList: ArtikelListType;
  query: string;
}) {
  return (
    <>
      <div className="mt-[80px] mx-4">
        <h1 className="font-bold text-lg">
          Hasil pencarian untuk{" "}
          <span className="text-primary">&quot;{query}&quot;</span>
        </h1>
        {searchList.data.length > 0 ? (
          <ul className="mt-4 space-y-4">
            {searchList.data.map((artikel) => (
              <li key={artikel.slug} className="border-b pb-4">
                <div className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-4  ">
                    <Link href={`/detail-berita/${artikel.slug}`} className="">
                      <Image
                        src={artikel.url_image}
                        alt={artikel.nama}
                        width={100}
                        height={100}
                        priority
                        className="h-24 lg:h-44 w-full object-cover rounded-md"
                      />
                    </Link>
                  </div>
                  <div className="col-span-8">
                    <Link
                      href={`/detail-berita/${artikel.slug}`}
                      className="focus:underline"
                    >
                      <h2 className="font-semibold text-sm line-clamp-2">
                        {artikel.nama}
                      </h2>
                    </Link>
                    <div className="flex items-center gap-2 text-[13px] mb-2 mt-2 lg:hidden">
                      <h1 className="flex items-center gap-1 font-medium">
                        <FaUserCircle />
                        FonetikaHEALTH{" "}
                        <span className="text-primary">
                          <RiVerifiedBadgeFill />
                        </span>
                      </h1>
                    </div>
                    <p className="flex items-center gap-1   text-[13px]  mt-2 text-gray-400 lg:hidden">
                      <span>{formatDateSecond(artikel.created_at)}</span>
                      <span className="font-semibold  text-primary">
                        {artikel.kategori.nama}
                      </span>
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-gray-600">Tidak ada hasil ditemukan.</p>
        )}
      </div>
      <div className="mt-4">
        <Trending />
      </div>
    </>
  );
}
