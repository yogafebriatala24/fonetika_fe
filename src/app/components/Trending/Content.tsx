import { BeritaType } from "@/app/types/BeritaType";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { LuUserPen } from "react-icons/lu";
import { MdOutlineDateRange } from "react-icons/md";

export default function ContentTrending({
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

  return (
    <>
      <div className="mt-4 ">
        {listBerita?.map((data) => (
          <div className="grid grid-cols-12 gap-2 mt-4 " key={data.slug}>
            <div className="col-span-4 md:col-span-3">
              <Image
                src={"/images/samsat.png"}
                alt=""
                width={500}
                height={500}
                className="md:w-40 w-full h-[100px] rounded-md object-cover"
              />
            </div>
            <div className="col-span-8 md:col-span-9">
              <div>
                <Link href={`#`} className="w-full text-[14px] font-semibold ">
                  {truncateText(data.nama, 12)}
                </Link>
              </div>
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <LuUserPen /> <h1>Admin</h1>
                </div>
                <div className="flex items-center gap-2">
                  <MdOutlineDateRange />
                  <p>01-01-2025</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
