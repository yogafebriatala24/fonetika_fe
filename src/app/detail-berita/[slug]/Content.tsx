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

  const renderContentWithDropCap = (content: string) => {
    if (!content) return null;
    const firstLetter = content.charAt(0);
    const restOfContent = content.slice(1);

    return (
      <div className="relative">
        <span
          className="float-left text-7xl font-serif leading-[0.8] mr-1 mt-1"
          style={{
            fontSize: `${fontSize * 3}px`,
            lineHeight: "0.8",
          }}
        >
          {firstLetter}
        </span>
        <span style={{ fontSize: `${fontSize}px` }}>{restOfContent}</span>
      </div>
    );
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

        <div className="mt-4 text-justify">
          {renderContentWithDropCap(detailBerita.detail_artikel.content)}
        </div>
      </div>
    </>
  );
}
