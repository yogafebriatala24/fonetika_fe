"use client";
import { DetailBeritaType } from "@/app/types/DetailBerita";
import { formatDate } from "@/app/utils/FormatDate";
import Image from "next/image";
import React from "react";
import { IoMdShare } from "react-icons/io";
import { ImFontSize } from "react-icons/im";
import { FaUserCircle } from "react-icons/fa";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { usePopup } from "@/app/context/PopupContext";

export default function ContentDetailBerita({
  detailBerita,
}: {
  detailBerita: DetailBeritaType;
}) {
  const { fontSize, openFontSizePopup, openSharePopup } = usePopup();

  const handleFontSizeClick = () => {
    console.log("Opening font size popup");
    openFontSizePopup();
  };

  const handleShareClick = () => {
    console.log("Opening share popup");
    openSharePopup();
  };

  return (
    <>
      <div className="mt-6 mx-4">
        <div>
          <h1 className="font-bold text-2xl md:text-3xl">
            {detailBerita.detail_artikel.nama}
          </h1>
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
          <div className="flex items-center ms-auto text-gray-500 w-fit mt-2 gap-4 border border-gray-500 rounded py-2 px-4">
            <button className="text-xl" onClick={handleFontSizeClick}>
              <ImFontSize />
            </button>
            <button className="text-2xl" onClick={handleShareClick}>
              <IoMdShare />
            </button>
          </div>

          <Image
            src={detailBerita.detail_artikel.url_image}
            alt={detailBerita.detail_artikel.image}
            width={500}
            height={500}
            className="w-full h-60 object-cover mt-4"
          />
          <p className="text-center text-[11px] mt-1 text-gray-400">
            https://freeprik.com
          </p>
        </div>

        <p className="mt-4 text-justify">
          {detailBerita.detail_artikel.content}
        </p>
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
