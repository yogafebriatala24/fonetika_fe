"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { formatDateSecond } from "@/utils/FormatDate";
import Link from "next/link";
import { IconLine } from "@/app/assets/icons";
import { FaUserCircle } from "react-icons/fa";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { ArtikelListType, ArtikelType } from "@/types/ArtikelType";

export default function ContentHeadline({
  listBerita,
}: {
  listBerita: ArtikelListType;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const data = listBerita.data
    ? listBerita.data.slice(0, 3).map((berita) => ({
        src: berita.url_image,
        title: berita.nama,
        date: berita.created_at,
        content: berita.content, // Pastikan berita memiliki properti content
        slug: berita.slug,
        width: 200,
        height: 100,
      }))
    : [];

  const maxItems = 3;
  const limitedBerita = listBerita.data?.slice(0, maxItems);

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [data.length]);

  return (
    <div className="w-full relative mt-4  bg-gray-50 p-4 rounded">
      <h1 className="font-bold text-xl  text-primary">Headline</h1>
      <IconLine />
      <div className="relative w-full overflow-hidden mt-4">
        <div
          className="flex transition-all duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {data.map((data) => (
            <div
              key={data.slug}
              className="w-full flex-shrink-0 relative h-[350px] "
            >
              <Link href={`/detail-berita/${data.slug}`} prefetch={true}>
                <Image
                  src={data.src}
                  alt={data.title}
                  width={data.width}
                  height={data.height}
                  className="w-full h-full rounded object-cover hover:scale-105 hover:transition-all"
                />
              </Link>

              <div className=" absolute bottom-0   bg-white w-full  p-2 text-black   font-bold">
                <div className="flex items-center gap-2 text-[13px]  mt-2">
                  <h1 className="flex items-center gap-1 font-medium">
                    <FaUserCircle />
                    FonetikaPOLITIK{" "}
                    <span className="text-primary">
                      <RiVerifiedBadgeFill />
                    </span>
                  </h1>
                  <p className="bg-secondary text-[10px] rounded px-2">
                    Hot News
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-normal mb-2 text-gray-500">
                  <p className="">{formatDateSecond(data.date)}</p>
                  <p className="font-semibold text-primary">Politik</p>
                </div>

                <Link
                  href={`/detail-berita/${data.slug}`}
                  prefetch={true}
                  className="focus:underline md:text-2xl text-xl"
                >
                  {data.title}
                </Link>
                <p className="text-sm font-normal mt-2">{data.slug}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 ">
        {limitedBerita.map((data) => (
          <div className="border-b p-2" key={data.slug}>
            <Link
              href={`/detail-berita/${data.slug}`}
              className="font-medium text-[17px] md:text-lg focus:underline"
            >
              {data.nama}
            </Link>
            <div className="flex items-center gap-2 text-[13px] mb-2 mt-2">
              <h1 className="flex items-center gap-1 font-medium">
                <FaUserCircle />
                FonetikaTECH
                <span className="text-primary">
                  <RiVerifiedBadgeFill />
                </span>
              </h1>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-normal mb-2 text-gray-500">
              <p className="">{formatDateSecond(data.created_at)}</p>
              <p className="font-semibold text-primary">Politik</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
