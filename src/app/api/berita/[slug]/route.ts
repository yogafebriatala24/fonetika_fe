import axiosInstance from "@/app/libs/axiosIntance";
import { DetailBeritaType } from "@/app/types/DetailBerita";

export async function fetchDetailBerita(
  slug: string
): Promise<DetailBeritaType> {
  const response = await axiosInstance.get(`/artikel/${slug}`);
  return response.data.data;
}
