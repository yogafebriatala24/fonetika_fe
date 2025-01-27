"use client";
import { DetailBeritaType } from "@/types/DetailBerita";
import { formatDate } from "@/utils/FormatDate";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoMdShare } from "react-icons/io";
import { ImFontSize } from "react-icons/im";
import { FaUserCircle } from "react-icons/fa";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { usePopup } from "@/context/PopupContext";
import { stripTags } from "@/utils/useHtmlParser";
import DOMPurify from "dompurify";
import BacaJuga from "@/components/BacaJuga";
import BacaGoogleNews from "@/components/BacaGoogleNews";
import { BiLike, BiMessageRounded } from "react-icons/bi";

export default function ContentDetailBerita({
  detailBerita,
}: {
  detailBerita: DetailBeritaType;
}) {
  const { fontSize, openFontSizePopup, openSharePopup } = usePopup();
  const [isClient, setIsClient] = useState(false);
  const [sanitizedContent, setSanitizedContent] = useState("");

  useEffect(() => {
    setIsClient(true);

    const cleanContent = DOMPurify.sanitize(
      detailBerita.detail_artikel.content
    );
    setSanitizedContent(cleanContent);
  }, [detailBerita.detail_artikel.content]);

  const handleFontSizeClick = () => {
    openFontSizePopup();
  };

  const handleShareClick = () => {
    openSharePopup();
  };

  const processedContent = isClient ? stripTags(sanitizedContent) : "";

  return (
    <>
      <div className="col-span-12 lg:col-span-7 mx-4">
        <div className="">
          <h1 className="font-bold text-2xl lg:text-3xl">
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
            <button className="text-2xl active:scale-90 transition-all duration-100">
              <BiLike />
            </button>
            <button className="text-2xl active:scale-90 transition-all duration-100">
              <BiMessageRounded />
            </button>
            <button
              className="text-xl active:scale-90 transition-all duration-100"
              onClick={handleFontSizeClick}
            >
              <ImFontSize />
            </button>
            <button
              className="text-2xl active:scale-90 transition-all duration-100"
              onClick={handleShareClick}
            >
              <IoMdShare />
            </button>
          </div>
          <Image
            src={detailBerita.detail_artikel.url_image}
            alt={detailBerita.detail_artikel.nama}
            width={170}
            height={10}
            className="w-full h-full object-cover mt-4 rounded"
          />
          <p className="text-center text-[13px] mt-1 text-gray-400">
            {detailBerita.detail_artikel.nama}
          </p>
        </div>
        <div className="mt-3">
          {isClient && processedContent && (
            <span style={{ fontSize: `${fontSize}px` }}>
              <span className="font-bold">Fonetika.id - </span>

              {Array.isArray(processedContent) ? (
                <>
                  {processedContent.slice(0, 3)}
                  <BacaJuga />
                  {processedContent.slice(3)}
                </>
              ) : (
                <>{processedContent}</>
              )}
            </span>
          )}
        </div>

        <BacaGoogleNews />
      </div>
    </>
  );
}
