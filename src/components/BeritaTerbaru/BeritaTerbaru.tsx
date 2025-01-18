"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { IconLine } from "@/app/assets/icons";
import { formatDateSecond } from "@/utils/FormatDate";
import { ArtikelListType } from "@/types/ArtikelType";

export default function BeritaTerbaru({
  initialListBerita,
}: {
  initialListBerita: ArtikelListType;
}) {
  const [listBerita, setListBerita] = useState(initialListBerita);
  const [currentPage, setCurrentPage] = useState(
    initialListBerita.current_page
  );
  const [nextPageUrl, setNextPageUrl] = useState(
    initialListBerita.next_page_url
  );

  const loadMoreBerita = async () => {
    if (!nextPageUrl) return;

    try {
      const res = await fetch(nextPageUrl);
      const data = await res.json();

      if (data && data.data && Array.isArray(data.data.data)) {
        setListBerita((prevData) => ({
          ...prevData,
          data: [...prevData.data, ...data.data.data],
        }));
        setNextPageUrl(data.data.next_page_url);
        setCurrentPage(data.data.current_page);
      }
    } catch (error) {
      console.error("Error loading more berita:", error);
    }
  };

  return (
    <div className="mt-4">
      <ul>
        {listBerita.data.map((data) => (
          <li
            className="flex gap-4 items-center mt-4 border-b pb-4"
            key={data.slug}
          >
            <div className="w-1/3 md:w-1/2 lg:w-1/4">
              <Link href={`/detail-berita/${data.slug}`} prefetch={true}>
                <Image
                  src={data.url_image}
                  alt=""
                  width={70}
                  height={200}
                  className="w-full h-[95px] md:h-[150px] lg:h-[100px] rounded-md object-cover hover:scale-105 hover:transition-all"
                />
              </Link>
            </div>
            <div className="w-3/4">
              <div>
                <Link
                  href={`/detail-berita/${data.slug}`}
                  prefetch={true}
                  className="text-[15px] font-semibold focus:underline line-clamp-2"
                >
                  {data.nama}
                </Link>
              </div>
              <div className="flex items-center gap-2 text-[13px] mb-1 mt-2">
                <h1 className="flex items-center gap-1 font-medium">
                  <FaUserCircle />
                  FonetikaNEWS{" "}
                  <span className="text-primary">
                    <RiVerifiedBadgeFill />
                  </span>
                </h1>
              </div>
              <div className="flex items-center gap-2 text-[12px] text-gray-400">
                <span>{formatDateSecond(data.created_at)}</span>{" "}
                <span className="font-semibold text-primary">
                  {data.kategori.nama}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {nextPageUrl && (
        <div className="mt-4 flex justify-center font-medium text-primary text-sm">
          <button onClick={loadMoreBerita} className="flex gap-2 items-center ">
            Muat Lebih Banyak
            <IoIosArrowDown />
          </button>
        </div>
      )}
    </div>
  );
}
