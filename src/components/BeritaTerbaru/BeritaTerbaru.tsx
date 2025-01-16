"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

import { IoIosArrowDown } from "react-icons/io";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { BeritaType } from "@/types/BeritaType";
import { IconLine } from "@/app/assets/icons";
import { formatDateSecond } from "@/utils/FormatDate";
import { ArtikelType } from "@/types/ArtikelType";
import { useSession } from "next-auth/react";

export default function BeritaTerbaru({
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

  const maxItems = 10;
  const limitedBerita = listBerita?.slice(0, maxItems);

  return (
    <>
      <div className="mt-4 mx-4">
        <div className="flex  items-center gap-2 text-primary text-xl font-bold">
          <div className="w-full">
            <h4>Terbaru</h4>
            <span className="mt-2">
              <IconLine />
            </span>
          </div>
        </div>
        <div className="mt-4">
          {limitedBerita?.map((data) => (
            <div
              className="grid grid-cols-12 gap-2 mt-4 md:items-center"
              key={data.slug}
            >
              <div className="col-span-4 md:col-span-5 lg:col-span-3 ">
                <Link prefetch={true} href={`/detail-berita/${data.slug}`}>
                  <Image
                    src={data.url_image}
                    alt=""
                    width={70}
                    height={200}
                    className="lg:w-40 w-full h-[90px] md:h-[150px] lg:h-[100px] rounded-md  object-cover hover:scale-105 hover:transition-all"
                  />
                </Link>
              </div>
              <div className="col-span-8 md:col-span-7 lg:col-span-9">
                <div>
                  <Link
                    href={`/detail-berita/${data.slug}`}
                    prefetch={true}
                    className="w-full lg:text-base md:text-xl text-[14px] font-semibold focus:underline"
                  >
                    {truncateText(data.nama, 12)}
                  </Link>
                </div>
                <div className="flex items-center gap-2 text-[13px] mb-2 mt-1">
                  <h1 className="flex items-center gap-1 font-medium">
                    <FaUserCircle />
                    FonetikaNEWS{" "}
                    <span className="text-primary">
                      <RiVerifiedBadgeFill />
                    </span>
                  </h1>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-gray-400">
                  <span>{formatDateSecond(data.created_at)}</span>
                </div>
              </div>
              <div className="col-span-12 mt-2">
                <hr />
              </div>
            </div>
          ))}
          {listBerita && listBerita.length > maxItems && (
            <div className="mt-4 text-center text-primary text-sm">
              <Link
                href="/"
                className="flex gap-2 items-center justify-center"
                prefetch={true}
              >
                Muat Lebih Banyak
                <IoIosArrowDown />
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
