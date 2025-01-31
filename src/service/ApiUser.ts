import { fetchData } from "./BaseUrl";
import { fetchWithToken } from "./fetchWithToken";

export function fetchDetailUser(username: string): Promise<any> {
  return fetchData(`/profile/${username}`)
    .then((data) => {
      if (!data || !data) {
        throw new Error(`Invalid response format for username: ${username}`);
      }
      return data;
    })
    .catch((error) => {
      console.error(
        `Error in fetchDetailKategori for username ${username}:`,
        error
      );
      throw error;
    });
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
