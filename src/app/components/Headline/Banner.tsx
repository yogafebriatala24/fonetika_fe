import React from "react";

import ContentHeadline from "./Content";
import { fetchBeritaList } from "@/app/libs/ApiDetailBerita";

export default async function Headline() {
  const listBerita = await fetchBeritaList();
  return (
    <>
      <ContentHeadline listBerita={listBerita} />
    </>
  );
}
