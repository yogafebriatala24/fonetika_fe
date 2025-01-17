export async function fetchKategori() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/kategori`, {
    next: { revalidate: 10 },
    headers: {
      "Cache-Control": "public, max-age=60, stale-while-revalidate=120",
    },
  });
  const data = await res.json();
  return data.data;
}

export function fetchDetailKategori(slug: string): Promise<any> {
  return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/kategori/${slug}`, {
    next: { revalidate: 10 },
    headers: {
      "Cache-Control": "public, max-age=60, stale-while-revalidate=120",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch detail berita: ${res.statusText}`);
      }

      return res.json();
    })
    .then((data) => {
      if (!data || !data.data.artikel.data) {
        throw new Error(`Invalid response format for slug: ${slug}`);
      }
      console.log(data.data.artikel.data);
      return data.data.artikel.data;
    })
    .catch((error) => {
      console.error(`Error in fetchDetailBerita for slug ${slug}:`, error);
      throw error;
    });
}
