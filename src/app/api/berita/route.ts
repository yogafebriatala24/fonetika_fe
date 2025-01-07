import axiosInstance from "@/app/libs/axiosIntance";
import { BeritaType } from "@/app/types/BeritaType";
import { DetailBeritaType } from "@/app/types/DetailBerita";

export const fetchBeritaList = async (): Promise<BeritaType[]> => {
  const response = await axiosInstance.get("/home");
  console.log(response?.data.data.artikel_nasional);
  return response?.data.data.artikel_nasional;
};

export async function fetchDetailBerita(
  slug: string
): Promise<DetailBeritaType> {
  const response = await axiosInstance.get(`/artikel/${slug}`);
  console.log(response.data.data);
  return response.data.data;
}
