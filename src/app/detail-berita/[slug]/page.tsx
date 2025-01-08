import React from "react";
import ContentDetailBerita from "./Content";
import { fetchBeritaList, fetchDetailBerita } from "@/app/libs/ApiDetailBerita";
import { notFound } from "next/navigation";
import { DetailBeritaType } from "@/app/types/DetailBerita";
import { BeritaType } from "@/app/types/BeritaType";

export const revalidate = 90;

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;

  let detailBerita: DetailBeritaType | null = null;

  try {
    detailBerita = await fetchDetailBerita(slug);
  } catch (error) {
    console.error("Error fetching detail berita for metadata:", error);
    return {
      title: "Detail Berita",
    };
  }

  if (!detailBerita || !detailBerita.detail_artikel) {
    return {
      title: "Detail Berita",
    };
  }

  return {
    title: detailBerita.detail_artikel.nama || "Detail Berita",
    description: detailBerita.detail_artikel.slug || "",
    openGraph: {
      title: detailBerita.detail_artikel.nama || "Detail Berita",
      description: detailBerita.detail_artikel.slug || "",
      images: [
        {
          url: detailBerita.detail_artikel.url_image,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: detailBerita.detail_artikel.nama || "Detail Berita",
      description: detailBerita.detail_artikel.slug || "",
      images: [detailBerita.detail_artikel.url_image],
    },
  };
}

export default async function DetailBerita(props: { params: Params }) {
  const params = await props.params;
  const slug = params.slug;

  let detailBerita: DetailBeritaType | null = null;

  try {
    detailBerita = await fetchDetailBerita(slug);
  } catch (error) {
    notFound();
  }

  if (!detailBerita) {
    return null;
  }

  return (
    <>
      <ContentDetailBerita detailBerita={detailBerita} />
    </>
  );
}

export async function generateStaticParams() {
  const beritaList = await fetchBeritaList();

  return beritaList.map((berita: BeritaType) => ({
    slug: berita.slug,
  }));
}
