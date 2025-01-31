export async function fetchFollower(user_uuid: string): Promise<any> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/total-followers?user_uuid=${user_uuid}`,
    {
      method: "GET",
      next: { revalidate: 60 },
      headers: {
        "Cache-Control": "public, max-age=20, stale-while-revalidate=60",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch followers: ${response.statusText}`);
  }

  return response.json();
}
