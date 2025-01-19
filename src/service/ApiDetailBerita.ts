import { fetchData } from "./BaseUrl";

// Get Detail Berita --------------------------------------------------
export function fetchDetailBerita(slug: string): Promise<any> {
  return fetchData(`/artikel/${slug}`);
}

// Get Berita List -----------------------------------------------------
export function fetchBeritaList(
  search: string = "",
  page: number = 1
): Promise<any> {
  return fetchData(
    `/artikel?search=${encodeURIComponent(search)}&page=${page}`
  );
}

// Get Berita Rekomendasi ---------------------------------------------------
export function fetchBeritaRekomendasi(): Promise<any> {
  return fetchData(`/artikel-rekomendasi`);
}
