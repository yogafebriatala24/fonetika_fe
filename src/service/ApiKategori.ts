import { fetchData } from "./BaseUrl";

// Get Kategori List -----------------------------------------------------
export async function fetchKategori(): Promise<any> {
  return fetchData("/kategori");
}

// Get Detail Kategori -----------------------------------------------------
export function fetchDetailKategori(slug: string): Promise<any> {
  return fetchData(`/kategori/${slug}`)
    .then((data) => {
      if (!data || !data.artikel.data) {
        throw new Error(`Invalid response format for slug: ${slug}`);
      }
      console.log(data.artikel.data);
      return data.artikel.data;
    })
    .catch((error) => {
      console.error(`Error in fetchDetailKategori for slug ${slug}:`, error);
      throw error;
    });
}
