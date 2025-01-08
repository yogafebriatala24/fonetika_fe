"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image"; // Mengimpor komponen Image dari Next.js
import { BeritaType } from "@/app/types/BeritaType";
import { formatDate, formatDateSecond } from "@/app/utils/FormatDate";
import Link from "next/link";
import { IconLine } from "@/app/assets/icons";

export default function ContentHeadline({
  listBerita,
}: {
  listBerita: BeritaType[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const data = listBerita.slice(0, 1).map((berita) => ({
    src: berita.url_image,
    title: berita.nama,
    date: berita.created_at,
    content: berita.content,
    slug: berita.slug,
    width: 1200,
    height: 500,
  }));
  const limitListBerita = listBerita.slice(0, 2);

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
    <div className="w-full relative mt-4  bg-gray-50 p-4">
      <h1 className="font-bold text-xl mb-4 text-primary">Headline</h1>

      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-all duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {data.map((data) => (
            <div key={data.slug} className="w-full flex-shrink-0 relative ">
              <Image
                src={data.src}
                alt={data.title}
                width={data.width}
                height={data.height}
                className="w-full h-[400px]  rounded object-cover hover:scale-105 hover:transition-all "
              />
              <div className=" absolute bottom-0   bg-white  p-2 text-black text-lg   font-bold">
                <p className="text-xs font-normal mb-2">
                  {formatDateSecond(data.date)}
                </p>
                <Link
                  href={`/detail-berita/${data.slug}`}
                  className="hover:text-gray-600"
                >
                  {data.title}
                  <p className="text-sm font-normal mt-2 ">
                    {truncateText(data.content, 15)}
                  </p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 ">
        {limitListBerita.map((data) => (
          <div className="border-b p-2" key={data.slug}>
            <Link href={`/detail-berita/${data.slug}`} className="font-medium">
              {data.nama}
            </Link>
            <p className="text-xs mt-2 text-gray-500">
              {formatDateSecond(data.created_at)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
