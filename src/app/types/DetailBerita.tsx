export interface DetailBeritaType {
  detail_artikel: {
    nama: string;
    content: string;
    image: string;
    created_at: string;
    updatedAt: string;
    slug: string;
    url_image: string;
  };
  artikel_terkait: {
    slug: string;
    nama: string;
    content: string;
    image: string;
    created_at: string;
    updatedAt: string;
    url_image: string;
  }[];
}
