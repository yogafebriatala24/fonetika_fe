"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { IconLine } from "@/app/assets/icons";
import { formatDateSecond } from "@/utils/FormatDate";
import { ArtikelListType } from "@/types/ArtikelType";
import { fetchBeritaList } from "@/service/ApiDetailBerita";

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
    <div className="mt-4 mx-4">
      <div className="flex items-center gap-2 text-primary text-xl font-bold">
        <div className="w-full">
          <h4>Terbaru</h4>
          <span className="mt-2">
            <IconLine />
          </span>
        </div>
      </div>
      <div className="mt-4">
        {listBerita.data.map((data) => (
          <div
            className="grid grid-cols-12 gap-2 mt-4 md:items-center"
            key={data.slug}
          >
            <div className="col-span-4 md:col-span-5 lg:col-span-3">
              <Link href={`/detail-berita/${data.slug}`} prefetch={true}>
                <Image
                  src={data.url_image}
                  alt=""
                  width={70}
                  height={200}
                  className="lg:w-40 w-full h-[90px] md:h-[150px] lg:h-[100px] rounded-md object-cover hover:scale-105 hover:transition-all"
                />
              </Link>
            </div>
            <div className="col-span-8 md:col-span-7 lg:col-span-9">
              <div>
                <Link
                  href={`/detail-berita/${data.slug}`}
                  prefetch={true}
                  className="w-full lg:text-base md:text-xl text-[14px] font-semibold focus:underline line-clamp-2"
                >
                  {data.nama}
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
                <span>{formatDateSecond(data.created_at)}</span>{" "}
                <span className="font-semibold text-primary">
                  {data.kategori.nama}
                </span>
              </div>
            </div>
            <div className="col-span-12 mt-2">
              <hr />
            </div>
          </div>
        ))}
        {nextPageUrl && (
          <div className="mt-4 flex justify-center font-medium text-primary text-sm">
            <button
              onClick={loadMoreBerita}
              className="flex gap-2 items-center "
            >
              Muat Lebih Banyak
              <IoIosArrowDown />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
