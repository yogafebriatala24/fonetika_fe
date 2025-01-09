import { BeritaType } from "@/app/types/BeritaType";
import { formatDateSecond } from "@/app/utils/FormatDate";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
              className="md:w-[200px] w-[180px]  shrink-0 h-[100px] md:h-[120px] rounded-md object-cover"
            />
            {/* Title */}
            <Link href={`/detail-berita/${data.slug}`}>
              <p className="text-xs  mt-3 text-gray-400 md:hidden">
                {formatDateSecond(data.created_at)}
              </p>
              <p className="md:mt-2  mt-2 md:text-lg font-medium focus:text-gray-500 md:font-semibold md:max-w-full max-w-[190px]">
                {truncateText(data.nama, 10)}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
