import { ArtikelType } from "@/app/types/ArtikelType";
import { BeritaType } from "@/app/types/BeritaType";
import { formatDateSecond } from "@/app/utils/FormatDate";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { RiVerifiedBadgeFill } from "react-icons/ri";

export default function ContentTrending({
  listBerita,
}: {
  listBerita: ArtikelType[];
}) {
  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  return (
    <>
      {/* Container for ContentTrending */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-auto scrollbar">
        {listBerita?.map((data) => (
          <div
            className="flex-shrink-0 lg:flex lg:gap-4  lg:mb-4"
            key={data.slug}
          >
            {/* Image */}
            <Image
              src={data.url_image}
              alt={data.nama}
              width={70}
              height={100}
              className="lg:w-[200px] w-[180px] hover:scale-105 hover:transition-all   h-[100px] lg:h-[120px] rounded-md object-cover"
            />
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
            <p className="text-[11px]  mt-3 text-gray-400 lg:hidden">
              {formatDateSecond(data.created_at)}
            </p>
            <div className="">
              <Link
                href={`/detail-berita/${data.slug}`}
                className="focus:underline"
              >
                <p className="lg:mt-0  mt-2 font-medium  lg:font-semibold  lg:max-w-full max-w-[190px]">
                  {truncateText(data.nama, 15)}
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
