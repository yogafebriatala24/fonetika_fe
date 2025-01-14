export function fetchDetailBerita(slug: string): Promise<any> {
  return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/artikel/${slug}`, {
    next: { revalidate: 90 },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch detail berita: ${res.statusText}`);
      }

      return res.json();
    })
    .then((data) => {
      if (!data || !data.detail_artikel) {
        throw new Error(`Invalid response format for slug: ${slug}`);
      }

      return data.detail_artikel;
    })
    .catch((error) => {
      console.error(`Error in fetchDetailBerita for slug ${slug}:`, error);
      throw error;
    });
}

export async function fetchBeritaList() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/artikel`, {
    next: { revalidate: 90 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch berita list: ${res.statusText}`);
  }

  const data = await res.json();

  if (!data || !data.data.data) {
    throw new Error("Invalid response format from API");
  }

  return data.data.data;
}
