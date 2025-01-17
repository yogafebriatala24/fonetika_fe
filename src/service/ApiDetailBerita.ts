export function fetchDetailBerita(slug: string): Promise<any> {
  return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/artikel/${slug}`, {
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
      if (!data || !data.data) {
        throw new Error(`Invalid response format for slug: ${slug}`);
      }

      return data.data;
    })
    .catch((error) => {
      console.error(`Error in fetchDetailBerita for slug ${slug}:`, error);
      throw error;
    });
}

export async function fetchBeritaList(page: number = 1) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/artikel?page=${page}`,
    {
      next: { revalidate: 10 },
      headers: {
        "Cache-Control": "public, max-age=60, stale-while-revalidate=120",
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch berita list: ${res.statusText}`);
  }

  const data = await res.json();

  if (!data || !data.data) {
    throw new Error("Invalid response format from API");
  }

  return data.data;
}
