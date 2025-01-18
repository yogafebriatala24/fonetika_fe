import { IconLine } from "@/app/assets/icons";
import BuatBerita from "@/components/Profile/BuatBerita";

import React from "react";

export default function CreateBerita() {
  return (
    <>
      <div className="mt-[90px] mx-4 lg:mx-0">
        <h1 className="font-semibold text-xl text-primary">
          Yuk Berbagi Informasi
        </h1>
        <IconLine />
        <BuatBerita />
      </div>
    </>
  );
}
