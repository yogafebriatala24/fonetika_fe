import fetchWithToken from "./fetchWithToken";

export async function fetchDetailUser(uuid: string) {
  try {
    const data = await fetchWithToken(`/profile/${uuid}`, {
      next: { revalidate: 60 },
      method: "GET",
      headers: {
        "Cache-Control": "public, max-age=20, stale-while-revalidate=60",
      },
    });

    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Error ambil detail user");
    }
  }
}

export async function updateProfile(profileData: Record<string, any>) {
  try {
    const data = await fetchWithToken(`/profile-update`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: JSON.stringify(profileData),
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Error memperbarui profil");
    }
  }
}
