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
