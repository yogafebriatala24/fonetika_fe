"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { LuUserPen } from "react-icons/lu";
import { MdOutlineDateRange } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { BeritaType } from "@/app/types/BeritaType";
import { IconLine } from "@/app/assets/icons";
import { formatDateSecond } from "@/app/utils/FormatDate";

export default function BeritaTerbaru({
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
              className="grid grid-cols-12 gap-2 mt-4 items-center"
              key={data.slug}
            >
              <div className="col-span-4 md:col-span-3 ">
                <Image
                  src={data.url_image}
                  alt=""
                  width={500}
                  height={500}
                  className="md:w-40 w-full h-[100px] rounded  object-cover"
                />
              </div>
              <div className="col-span-8 md:col-span-9">
                <div>
                  <Link
                    href={`/detail-berita/${data.slug}`}
                    prefetch
                    className="w-full md:text-base text-[15px] font-semibold hover:text-gray-600"
                  >
                    {truncateText(data.nama, 12)}
                  </Link>
                </div>
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <LuUserPen /> <h1>Admin</h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <MdOutlineDateRange />
                    <p>{formatDateSecond(data.created_at)}</p>
                  </div>
                </div>
              </div>
              <div className="col-span-12 mt-2">
                <hr />
              </div>
            </div>
          ))}
          {listBerita && listBerita.length > maxItems && (
            <div className="mt-4 text-center text-primary text-sm">
              <Link href="/" className="flex gap-2 items-center justify-center">
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
