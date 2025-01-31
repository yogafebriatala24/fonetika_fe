"use client";
import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextEditor from "@/components/TextEditor/TextEditor";
import { KategoriListType } from "@/types/KategoriListType";
import { fetchWithToken } from "@/service/fetchWithToken";

interface ArticleFormValues {
  nama: string;
  image: File | null;
  keyword: string;
  kategori_slug: string;
}

const ArticleSchema = Yup.object().shape({
  nama: Yup.string()
    .required("Judul artikel wajib diisi")
    .min(10, "Judul minimal 10 karakter")
    .max(200, "Judul maksimal 200 karakter"),

  image: Yup.mixed<File>()
    .required("Gambar wajib diunggah")
    .test(
      "fileSize",
      "Ukuran file terlalu besar",
      (value: File) => value && value.size <= 2 * 1024 * 1024
    )
    .test(
      "fileType",
      "Format file tidak didukung",
      (value: File) =>
        value && ["image/jpeg", "image/png", "image/gif"].includes(value.type)
    ),

  keyword: Yup.string()
    .required("Kata kunci wajib diisi")
    .min(3, "Kata kunci minimal 3 karakter")
    .max(100, "Kata kunci maksimal 100 karakter"),

  kategori_slug: Yup.string().required("Kategori wajib dipilih"),
});

export default function BuatBerita({
  listKategori,
}: {
  listKategori: KategoriListType[];
}) {
  const [editorContent, setEditorContent] = useState<string>("");
  const [editorError, setEditorError] = useState<string | null>(null);
  const textEditorRef = useRef<any>(null);

  const validateEditorContent = () => {
    const content = textEditorRef.current?.getEditorContent?.() || "";
    const strippedContent = content.replace(/<[^>]*>/g, "").trim();

    if (strippedContent.length < 50) {
      setEditorError("Konten artikel minimal 50 karakter");
      return false;
    }

    setEditorContent(content);
    setEditorError(null);
    return true;
  };

  const formik = useFormik<ArticleFormValues>({
    initialValues: {
      nama: "",
      image: null,
      keyword: "",
      kategori_slug: "",
    },
    validationSchema: ArticleSchema,
    onSubmit: async (values, { setSubmitting }) => {
      if (!validateEditorContent()) {
        setSubmitting(false);
        return;
      }

      try {
        const formData = new FormData();
        formData.append("nama", values.nama);
        formData.append("keyword", values.keyword);
        formData.append("content", editorContent);
        formData.append("kategori_slug", values.kategori_slug);

        if (values.image) {
          formData.append("image", values.image);
        }

        console.log("FormData Content:");
        for (const [key, value] of formData.entries()) {
          console.log(key, value);
        }

        const response = await fetchWithToken("/artikel-create", {
          method: "POST",
          body: formData,
        });

        alert("Artikel berhasil dibuat!");
      } catch (error) {
        console.error("Submission Error:", error);
        alert(error instanceof Error ? error.message : "Gagal membuat artikel");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="nama"
            className="block text-sm font-medium text-gray-700"
          >
            Judul Artikel
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nama}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            placeholder="Masukkan judul artikel"
          />
          {formik.touched.nama && formik.errors.nama && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.nama}
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="kategori_slug"
            className="block text-sm font-medium text-gray-700"
          >
            Kategori Artikel
          </label>
          <select
            id="kategori_slug"
            name="kategori_slug"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.kategori_slug}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          >
            <option value="">Pilih Kategori</option>
            {listKategori.map((kategori) => (
              <option key={kategori.slug} value={kategori.slug}>
                {kategori.nama}
              </option>
            ))}
          </select>
          {formik.touched.kategori_slug && formik.errors.kategori_slug && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.kategori_slug}
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Gambar
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/jpeg,image/png,image/gif"
            onChange={(event) => {
              const file = event.currentTarget.files?.[0] || null;
              formik.setFieldValue("image", file);
            }}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
          {formik.touched.image && formik.errors.image && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.image}
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="keyword"
            className="block text-sm font-medium text-gray-700"
          >
            Kata Kunci
          </label>
          <input
            type="text"
            id="keyword"
            name="keyword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.keyword}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            placeholder="Masukkan kata kunci"
          />
          {formik.touched.keyword && formik.errors.keyword && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.keyword}
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Konten Artikel
          </label>
          <TextEditor ref={textEditorRef} />
          {editorError && (
            <div className="text-red-500 text-sm mt-1">{editorError}</div>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {formik.isSubmitting ? "Memproses..." : "Terbitkan Artikel"}
          </button>
        </div>
      </form>
    </div>
  );
}
