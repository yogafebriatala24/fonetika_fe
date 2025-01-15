"use client";
import { DetailBeritaType } from "@/types/DetailBerita";
import { formatDate } from "@/utils/FormatDate";
import Image from "next/image";
import React from "react";
import { IoMdShare } from "react-icons/io";
import { ImFontSize } from "react-icons/im";
import { FaUserCircle } from "react-icons/fa";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { usePopup } from "@/context/PopupContext";
import { useSession } from "next-auth/react";

export default function ContentDetailBerita({
  detailBerita,
}: {
  detailBerita: DetailBeritaType;
}) {
  const { fontSize, openFontSizePopup, openSharePopup } = usePopup();

  const handleFontSizeClick = () => {
    openFontSizePopup();
  };

  const handleShareClick = () => {
    openSharePopup();
  };

  return (
    <>
      <div className="col-span-12 lg:col-span-7 mx-4">
        <div className="">
          {/* Judul Berita */}
          <h1 className="font-bold text-2xl lg:text-3xl">
            {detailBerita.detail_artikel.nama}
          </h1>

          {/* Informasi Penulis dan Tanggal */}
          <div className="flex items-center gap-2 text-sm mb-2 mt-4">
            <h1 className="flex items-center gap-1 font-medium">
              <FaUserCircle />
              FonetikaNews{" "}
              <span className="text-primary">
                <RiVerifiedBadgeFill />
              </span>
            </h1>
          </div>
          <p className="mt-2 text-gray-500 text-[14px]">
            {formatDate(detailBerita.detail_artikel.created_at)}
          </p>

          {/* Tombol untuk Font Size dan Share */}
          <div className="flex items-center ms-auto text-gray-500 w-fit mt-2 gap-4 border border-gray-500 rounded py-2 px-4">
            <button className="text-xl" onClick={handleFontSizeClick}>
              <ImFontSize />
            </button>
            <button className="text-2xl" onClick={handleShareClick}>
              <IoMdShare />
            </button>
          </div>

          {/* Gambar Berita */}
          <Image
            src={detailBerita.detail_artikel.url_image}
            alt={detailBerita.detail_artikel.image}
            width={170}
            height={10}
            className="w-full h-60 object-cover mt-4"
          />
          <p className="text-center text-[11px] mt-1 text-gray-400">
            https://freeprik.com
          </p>
        </div>
        {/* Konten Berita */}
        <p className="mt-4 text-justify" style={{ fontSize: `${fontSize}px` }}>
          {detailBerita.detail_artikel.content}
        </p>

        {/* Baca Juga Section */}
        <div className="mt-4 mb-4 bg-gray-50 p-3">
          <h4 className="font-medium text-primary">Baca Juga</h4>
          <div className="mt-4">
            <p className="font-semibold">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
