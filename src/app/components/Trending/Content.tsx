import { BeritaType } from "@/app/types/BeritaType";
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
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-auto ">
        {listBerita?.map((data) => (
          <div
            className="flex-shrink-0 md:flex md:gap-4  md:mb-4"
            key={data.slug}
          >
            {/* Image */}
            <Image
              src={data.url_image}
              alt={data.nama}
              width={500}
              height={500}
              className="md:w-[200px] w-[200px] shrink-0 h-[100px] rounded-md object-cover"
            />
            {/* Title */}
            <Link href={`/detail-berita/${data.slug}`}>
              <p className="md:mt-2 text-sm md:text-lg hover:text-gray-600 md:font-semibold md:max-w-full max-w-[190px]">
                {truncateText(data.nama, 10)}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
