import React from "react";
import ContentDetailBerita from "./Content";
import { fetchBeritaList, fetchDetailBerita } from "@/service/ApiDetailBerita";
import { notFound } from "next/navigation";
import { DetailBeritaType } from "@/types/DetailBerita";
import { BeritaType } from "@/types/BeritaType";
import Trending from "@/components/Trending/Trending";
import KolomKomentar from "@/components/KolomKomentar";
import BeritaTerkait from "@/components/BeritaTerkait";
import TopikTrending from "@/components/TopikTrending/TopikTrending";
import { fetchKomentarList } from "@/service/ApiKomentar";

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
    description: detailBerita.detail_artikel.content || "",
    openGraph: {
      title: detailBerita.detail_artikel.nama || "Detail Berita",
      description: detailBerita.detail_artikel.content || "",
      images: [
        {
          url: `${detailBerita.detail_artikel.url_image}?v=${Date.now()}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: detailBerita.detail_artikel.nama || "Detail Berita",
      description: detailBerita.detail_artikel.content || "",
      images: [detailBerita.detail_artikel.url_image],
    },
  };
}

export default async function DetailBerita(props: { params: Params }) {
  const params = await props.params;
  const slug = params.slug;

  let detailBerita: DetailBeritaType | null = null;
  const listKomentar = await fetchKomentarList(slug);

  try {
    detailBerita = await fetchDetailBerita(slug);
    console.log(detailBerita);
  } catch (error) {
    notFound();
  }

  if (!detailBerita) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-12 gap-2  mt-[80px] lg:mt-28">
        <ContentDetailBerita detailBerita={detailBerita} />
        <div className="col-span-12 lg:col-span-5  sticky-wrapper">
          <div className="sticky top-20" id="trending-section">
            <Trending />
            <TopikTrending />
          </div>
        </div>
        <BeritaTerkait artikelTerkait={detailBerita.artikel_terkait} />
      </div>
      <KolomKomentar listKomentar={listKomentar} artikelSlug={slug} />
    </>
  );
}

export async function generateStaticParams() {
  try {
    const beritaList = await fetchBeritaList();

    if (!Array.isArray(beritaList)) {
      return [];
    }

    return beritaList
      .filter((berita: BeritaType) => berita && berita.slug)
      .map((berita: BeritaType) => ({
        slug: berita.slug,
      }));
  } catch (error) {
    console.error("Error saat generate static params:", error);
    return [];
  }
}
