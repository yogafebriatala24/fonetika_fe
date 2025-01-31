import { fetchData } from "./BaseUrl";

// Get Detail Berita --------------------------------------------------
export function fetchKomentarList(slug: string): Promise<any> {
  return fetchData(`/komentar-by-artikel/${slug}`, {
    next: { revalidate: 0 },
  });
}
