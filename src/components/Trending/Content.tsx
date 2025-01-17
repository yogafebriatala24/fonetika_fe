import { ArtikelListType, ArtikelType } from "@/types/ArtikelType";
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
  listBerita: ArtikelListType;
}) {
  const maxItems = 4;
  const limitedBerita = listBerita.data?.slice(0, maxItems);

  return (
    <>
      {/* Container for ContentTrending */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-auto scrollbar">
        {limitedBerita?.map((data) => (
          <div className=" lg:flex lg:gap-4  lg:mb-4" key={data.slug}>
            {/* Image */}
            <Link
              prefetch={true}
              href={`/detail-berita/${data.slug}`}
              className="flex-shrink-0"
            >
              <Image
                src={data.url_image}
                alt={data.nama}
                width={70}
                height={100}
                className="lg:w-[200px] w-[180px] hover:scale-105 hover:transition-all   h-[100px] lg:h-[120px] rounded-md object-cover"
              />
            </Link>
            {/* Title */}
            <div className="flex items-center gap-2 text-sm mb-2 mt-2 lg:hidden">
              <h1 className="flex items-center gap-1 font-medium">
                <FaUserCircle />
                FonetikaHEALTH{" "}
                <span className="text-primary">
                  <RiVerifiedBadgeFill />
                </span>
              </h1>
            </div>
            <p className="flex flex-col   text-[11px]  mt-2 text-gray-400 lg:hidden">
              <span>{formatDateSecond(data.created_at)}</span>
              <span className="font-semibold mt-1  text-primary">
                {data.kategori.nama}
              </span>
            </p>
            <div className="mt-1">
              <Link
                prefetch={true}
                href={`/detail-berita/${data.slug}`}
                className="focus:underline"
              >
                <p className="lg:mt-0   font-medium line-clamp-2  lg:font-semibold  lg:max-w-full max-w-[190px]">
                  {data.nama}
                </p>
              </Link>
              <p className="flex  items-center text-[11px]  mt-2 text-gray-400 lg:block max-lg:hidden">
                <span>{formatDateSecond(data.created_at)}</span>
                <span className="font-semibold ml-2 text-primary">Health</span>
              </p>
              <span className="hidden lg:block text-[13px] mt-2">
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
