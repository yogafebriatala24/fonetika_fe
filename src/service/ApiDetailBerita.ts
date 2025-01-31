import { fetchData } from "./BaseUrl";

// Get Detail Berita --------------------------------------------------
export function fetchDetailBerita(slug: string): Promise<any> {
  return fetchData(`/artikel/${slug}`);
}

// Get Berita List -----------------------------------------------------
export function fetchBeritaList(
  search: string = "",
  page: number = 1,
  limit: number = 10
): Promise<any> {
  return fetchData(
    `/artikel?search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`
  );
}

// Get Berita Rekomendasi ---------------------------------------------------
export function fetchBeritaRekomendasi(): Promise<any> {
  return fetchData(`/artikel-rekomendasi`);
}

export function fetchBeritaByUser(search: string = ""): Promise<any> {
  return fetchData(`/artikelByUser?username=${encodeURIComponent(search)}`);
}

export function fetchBeritaPopuler(limit: number = 5): Promise<any> {
  return fetchData(`/artikel-populer?limit=${limit}`);
}
