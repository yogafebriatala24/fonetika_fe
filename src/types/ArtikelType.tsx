import { KategoriListType } from "./KategoriListType";
import { UserType } from "./UserType";

export interface ArtikelListType {
  current_page: number;
  next_page_url: string;
  per_page: number;
  total: number;
  last_page: number;
  data: ArtikelType[];
}

export interface ArtikelTerkaitType {
  slug: string;
  nama: string;
  content: string;
  image: string;
  created_at: string;
  updatedAt: string;
  url_image: string;
}
export interface ArtikelType {
  nama: string;
  created_at: string;
  image: string;
  kategori: KategoriListType;
  keyword: string;
  user: UserType;
  content: string;
  slug: string;
  url_image: string;
  artikel_terkait: ArtikelTerkaitType[];
}

export interface ArtikelPopulerType {
  count: number;
  artikel: ArtikelType;
}

export interface ArtikelPopulerListType {
  current_page: number;
  next_page_url: string;
  per_page: number;
  total: number;
  last_page: number;
  data: ArtikelPopulerType[];
}
