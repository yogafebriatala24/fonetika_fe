import {
  ArtikelListType,
  ArtikelPopulerListType,
  ArtikelPopulerType,
  ArtikelType,
} from "@/types/ArtikelType";
import { formatDateSecond } from "@/utils/FormatDate";
import { da } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { RiVerifiedBadgeFill } from "react-icons/ri";

export default function ContentTrending({
  listBerita,
}: {
  listBerita: ArtikelPopulerType[];
}) {
  return (
    <>
      <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-auto scrollbar">
        {listBerita?.map((data) => (
          <div className=" lg:flex lg:gap-4  lg:mb-4" key={data.artikel.slug}>
            <Link
              prefetch={true}
              href={`/detail-berita/${data.artikel.slug}`}
              className="flex-shrink-0 focus:scale-95 focus:transition-all"
            >
              <Image
                src={data.artikel.url_image}
                alt={data.artikel.nama}
                width={70}
                height={100}
                priority
                className="lg:w-[200px] w-[180px]    h-[100px] lg:h-[120px] rounded-md object-cover"
              />
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
            <p className="flex flex-col   text-[12px]  mt-1 text-gray-400 lg:hidden">
              <span>{formatDateSecond(data.artikel.created_at)}</span>
              <span className="font-semibold  text-primary">
                {data.artikel.kategori.nama}
              </span>
            </p>
            <div className="mt-1">
              <Link
                prefetch={true}
                href={`/detail-berita/${data.artikel.slug}`}
                className="focus:underline"
              >
                <p className="lg:mt-0   font-medium line-clamp-2  lg:font-semibold  lg:max-w-full max-w-[190px]">
                  {data.artikel.nama}
                </p>
              </Link>
              <p className="flex  items-center text-[12px]  mt-2 text-gray-400 lg:block max-lg:hidden">
                <span>{formatDateSecond(data.artikel.created_at)}</span>
                <span className="font-semibold ml-2 text-primary">Health</span>
              </p>
              <span className="hidden lg:block text-[13px] mt-1">
                <span className="flex items-center gap-1 font-medium ">
                  <FaUserCircle />
                  FonetikaHEALTH{" "}
                  <span className="text-primary">
                    <RiVerifiedBadgeFill />
                  </span>
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
