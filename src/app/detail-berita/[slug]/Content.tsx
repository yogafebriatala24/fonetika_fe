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
import { fetchWithToken } from "@/service/fetchWithToken";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ContentDetailBerita({
  detailBerita,
}: {
  detailBerita: DetailBeritaType;
}) {
  const router = useRouter();
  const { fontSize, openFontSizePopup, openSharePopup } = usePopup();
  const [isClient, setIsClient] = useState(false);
  const [sanitizedContent, setSanitizedContent] = useState("");
  const [isLiked, setIsLiked] = useState(detailBerita.sudah_like || false);
  const { data: session } = useSession();

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

  const handleLikeClick = async () => {
    if (!session?.user.token) {
      router.push("/signin");
      return;
    }
    try {
      const newLikedState = !isLiked;
      setIsLiked(newLikedState);

      await fetchWithToken(
        `/like-artikel/${detailBerita.detail_artikel.slug}`,
        {
          method: "POST",
        }
      );
    } catch (error) {
      setIsLiked(isLiked);

      alert("Gagal melakukan like. Silakan coba lagi.");

      console.error("Failed to like article:", error);
    }
  };

  const processedContent = isClient ? stripTags(sanitizedContent) : "";
  const latestRelatedArticle = detailBerita.artikel_terkait.data[0];

  const handleScrollToBottom = () => {
    const kolomKomentar = document.getElementById("kolom-komentar");
    if (kolomKomentar) {
      kolomKomentar.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <>
      <div className="col-span-12 lg:col-span-7 mx-4">
        <div className="">
          <h1 className="font-bold text-2xl lg:text-3xl">
            {detailBerita.detail_artikel.nama}
          </h1>
          <div className="flex items-center gap-2 text-sm mb-2 mt-4">
            <Link
              href={`/profile/${detailBerita.detail_artikel.user.username}`}
              className="flex items-center gap-1 font-medium"
            >
              <Image
                src={detailBerita.detail_artikel.user.image_url || "/user.png"}
                alt="user"
                width={100}
                height={100}
                className="w-[20px] h-[20px] rounded-full object-cover"
              />
              {detailBerita.detail_artikel.user.name}
              <span className="text-primary">
                <RiVerifiedBadgeFill />
              </span>
            </Link>
          </div>
          <p className="mt-2 text-gray-500 text-[14px]">
            {formatDate(detailBerita.detail_artikel.created_at)}
          </p>
          <div className="flex items-center ms-auto text-gray-500 w-fit mt-2 gap-4 border border-gray-500 rounded py-2 px-4">
            <button
              className={`text-2xl active:scale-90 transition-all duration-100 ${
                isLiked ? "text-primary" : ""
              }`}
              onClick={handleLikeClick}
            >
              <BiLike />
            </button>
            <button
              className="text-2xl active:scale-90 transition-all duration-100"
              onClick={handleScrollToBottom}
            >
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
            className="w-full h-[350px] object-cover mt-4 rounded"
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
                  <BacaJuga article={latestRelatedArticle} />
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
