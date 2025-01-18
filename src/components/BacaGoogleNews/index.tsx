import Link from "next/link";
import React from "react";
import { SiGooglenews } from "react-icons/si";

export default function BacaGoogleNews() {
  return (
    <>
      <div className="mt-6 mb-6 flex items-center gap-2">
        <SiGooglenews className="text-blue-400 text-4xl" />
        <span className="text-sm lg:text-base text font-semibold">
          Baca juga berita Fonetika di{" "}
          <Link href={"/"} className="text-primary">
            Google News
          </Link>
        </span>
      </div>
    </>
  );
}
