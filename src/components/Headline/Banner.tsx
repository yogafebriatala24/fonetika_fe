import React from "react";

import ContentHeadline from "./Content";
import { fetchBeritaList } from "@/service/ApiDetailBerita";

export default async function Headline() {
  const [listBerita] = await Promise.all([fetchBeritaList()]);
  return (
    <>
      <ContentHeadline listBerita={listBerita} />
    </>
  );
}
