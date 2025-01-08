export function fetchDetailBerita(slug: string): Promise<any> {
  return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/artikel/${slug}`, {
    next: { revalidate: 30 },
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

export async function fetchBeritaList() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/home`, {
    next: { revalidate: 30 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch berita list: ${res.statusText}`);
  }

  const data = await res.json();

  console.log(data);

  if (!data || !data.data || !data.data.artikel_nasional) {
    throw new Error("Invalid response format from API");
  }

  return data.data.artikel_nasional;
}
