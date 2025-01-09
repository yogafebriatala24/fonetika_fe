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
  listBerita: BeritaType[];
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
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-auto scrollbar">
        {listBerita?.map((data) => (
          <div
            className="flex-shrink-0 md:flex md:gap-4  md:mb-4"
            key={data.slug}
          >
            {/* Image */}
            <Image
              src={data.url_image}
              alt={data.nama}
              width={200}
              height={100}
              className="md:w-[200px] w-[180px] hover:scale-105 hover:transition-all  shrink-0 h-[100px] md:h-[120px] rounded-md object-cover"
            />
            {/* Title */}
            <div className="flex items-center gap-2 text-sm mb-2 mt-2">
              <h1 className="flex items-center gap-1 font-medium">
                <FaUserCircle />
                FonetikaHEALTH{" "}
                <span className="text-primary">
                  <RiVerifiedBadgeFill />
                </span>
              </h1>
            </div>
            <p className="text-[11px]  mt-3 text-gray-400 md:hidden">
              {formatDateSecond(data.created_at)}
            </p>
            <Link
              href={`/detail-berita/${data.slug}`}
              className="focus:underline"
            >
              <p className="md:mt-2  mt-2 md:text-lg font-medium  md:font-semibold  md:max-w-full max-w-[190px]">
                {truncateText(data.nama, 10)}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
