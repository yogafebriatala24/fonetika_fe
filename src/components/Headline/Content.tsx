"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { formatDateSecond } from "@/utils/FormatDate";
import Link from "next/link";
import { IconLine } from "@/app/assets/icons";
import { FaUserCircle } from "react-icons/fa";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { ArtikelListType } from "@/types/ArtikelType";

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
        content: berita.content,
        slug: berita.slug,
        kategori: berita.kategori.nama,
        width: 200,
        height: 100,
      }))
    : [];

  const maxItems = 2;
  const limitedBerita = listBerita.data?.slice(0, maxItems);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [data.length]);

  return (
    <div className="w-full relative mt-4  bg-gray-50 p-4 rounded">
      <h1 className="font-bold text-xl  text-primary">Berita Utama</h1>
      <IconLine />
      <div className="relative w-full overflow-hidden mt-4 ">
        <div
          className="flex transition-all duration-500 ease-in-out "
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {data.map((data) => (
            <div
              key={data.slug}
              className="w-full flex-shrink-0 relative h-[300px] lg:h-[400px]"
            >
              <Link href={`/detail-berita/${data.slug}`} prefetch={true}>
                <Image
                  src={data.src}
                  alt={data.title}
                  width={data.width}
                  height={data.height}
                  priority
                  className="rounded w-full object-cover hover:scale-105 hover:transition-all"
                />
              </Link>

              <div className=" absolute bottom-0   bg-white w-full  p-2 text-black   font-bold">
                <div className="flex items-center gap-2 text-[13px] mb-1 mt-2">
                  <h1 className="flex items-center gap-1 font-medium">
                    <Image
                      src={"/user2.jpg"}
                      alt="user"
                      width={100}
                      height={100}
                      className="w-[20px] h-[20px] rounded-full object-cover"
                    />
                    Gusti Maulana
                    <span className="text-primary">
                      <RiVerifiedBadgeFill />
                    </span>
                  </h1>
                  <p className="bg-secondary text-[10px] rounded px-2">
                    Hot News
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[12px] font-normal mb-2 text-gray-500">
                  <p className="">{formatDateSecond(data.date)}</p>
                  <p className="font-semibold text-primary">{data.kategori}</p>
                </div>

                <Link
                  href={`/detail-berita/${data.slug}`}
                  prefetch={true}
                  className="focus:underline md:text-2xl text-xl line-clamp-2"
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
              className="font-medium text-[17px] md:text-lg focus:underline line-clamp-2"
            >
              {data.nama}
            </Link>
            <div className="flex items-center gap-2 text-[13px] mb-1 mt-2">
              <h1 className="flex items-center gap-1 font-medium">
                <Image
                  src={"/user3.jpg"}
                  alt="user"
                  width={100}
                  height={100}
                  className="w-[20px] h-[20px] rounded-full object-cover"
                />
                Jupri Nugroho
                <span className="text-primary">
                  <RiVerifiedBadgeFill />
                </span>
              </h1>
            </div>
            <div className="flex items-center gap-2 text-[12px] font-normal text-gray-500">
              <p className="">{formatDateSecond(data.created_at)}</p>
              <p className="font-semibold text-primary">{data.kategori.nama}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
