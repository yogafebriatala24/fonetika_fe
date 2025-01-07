import React from "react";
import { IconLogo } from "./icons";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <div className="border-b border-gray-200 p-2">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <Link href="#">
              <IconLogo />
            </Link>
            <div className="ms-auto w-full">
              <input
                type="text"
                id="search"
                placeholder="Search..."
                className="border border-gray-300 p-1 w-full  rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
