import React from "react";
import ContentDetailBerita from "./Content";
import { fetchDetailBerita } from "@/app/libs/ApiDetailBerita";

export default async function DetailBerita({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const detailBerita = await fetchDetailBerita(slug);

  return (
    <>
      <ContentDetailBerita detailBerita={detailBerita} />
    </>
  );
}

export const revalidate = 10;
