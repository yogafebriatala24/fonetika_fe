export interface ArtikelListType {
  current_page: number;
  next_page_url: string;
  per_page: number;
  total: number;
  last_page: number;
  data: ArtikelType[];
}
export interface ArtikelType {
  nama: string;
  created_at: string;
  image: string;
  kategori: {
    slug: string;
    nama: string;
    created_at: string;
    updatedAt: string;
  };
  user: {
    name: string;
    phone: string;
    image: string;
    email: string;
    created_at: string;
    updatedAt: string;
  };
  content: string;
  slug: string;
  url_image: string;
}
