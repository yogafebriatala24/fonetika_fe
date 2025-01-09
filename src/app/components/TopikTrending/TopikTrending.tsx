import { IconLine } from "@/app/assets/icons";
import React from "react";

export default function TopikTrending() {
  return (
    <>
      <div className="mt-4 mx-4 md:bg-gray-50 md:p-4 md:rounded">
        <h1 className="text-primary text-xl font-bold">Topik Trending</h1>
        <IconLine />
        <div className="mt-4">
          <div className="flex flex-wrap items-center gap-4">
            <p className="font-semibold">#Shin Tae-yong</p>
            <p className="font-semibold">#Hasto Kristiyanto</p>
            <p className="font-semibold">#Timnas</p>
            <p className="font-semibold">#Liburan Bali</p>
            <p className="font-semibold">#Kopi Luwak</p>
          </div>
        </div>
      </div>
    </>
  );
}
