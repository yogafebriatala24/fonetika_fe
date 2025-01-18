import fetchWithToken from "./fetchWithToken";

export async function fetchDetailUser(uuid: string) {
  try {
    const data = await fetchWithToken(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/${uuid}`,
      {
        next: { revalidate: 60 },
        method: "GET",
        headers: {
          "Cache-Control": "public, max-age=20, stale-while-revalidate=60",
        },
      }
    );

    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Error ambil detail user");
    }
  }
}
