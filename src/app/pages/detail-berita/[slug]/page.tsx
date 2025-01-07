import React from "react";
const ContentDetailBerita = dynamic(() => import("./Content"), {
  ssr: false,
});
import { fetchDetailBerita } from "@/app/api/berita/GetBerita";
import dynamic from "next/dynamic";

export default async function DetailBerita({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const detailBerita = await fetchDetailBerita(slug);
  return (
    <>
      <ContentDetailBerita detailBerita={detailBerita} />
    </>
  );
}
export const revalidate = 10;
export const dynamicParams = true;
