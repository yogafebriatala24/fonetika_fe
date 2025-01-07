// src/app/api/berita/[slug]/route.ts

import axiosInstance from "@/app/libs/axiosIntance";
import { NextResponse } from "next/server";
import { DetailBeritaType } from "@/app/types/DetailBerita";

// Mengambil data detail berita berdasarkan slug
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  try {
    // Ambil data berdasarkan slug
    const response = await axiosInstance.get(`/artikel/${slug}`);
    const data: DetailBeritaType = response.data.data;

    // Return data sebagai JSON
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }
}
