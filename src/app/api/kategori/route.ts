import axiosInstance from "@/app/libs/axiosIntance";
import { BeritaType } from "@/app/types/BeritaType";

export const fetchKategoriList = async (): Promise<BeritaType[]> => {
  const response = await axiosInstance.get("/kategori");
  console.log(response?.data.data);
  return response?.data.data;
};
