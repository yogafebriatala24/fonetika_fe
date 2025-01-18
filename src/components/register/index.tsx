"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { RegisterType } from "@/types/RegisterType";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const registerUser = async (values: RegisterType) => {
    setLoading(true);

    const form = new FormData();
    form.append("name", values.name);
    form.append("email", values.email);
    form.append("password", values.password);
    form.append("phone", values.phone);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/register`,
        {
          method: "POST",
          body: form,
        }
      );

      const data = await response.json();

      if (response.ok) {
        const loginResponse = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        if (loginResponse?.error) {
          toast.error(loginResponse.error, {
            autoClose: 2000,
          });
        } else {
          toast.success("Registrasi berhasil!", {
            autoClose: 2000,
            onClose: () => {
              router.push("/");
            },
          });
        }
      } else {
        toast.error(data.message || "Registrasi gagal!", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Nama wajib diisi!"),
      email: yup
        .string()
        .email("Email tidak valid!")
        .required("Email wajib diisi!"),
      password: yup
        .string()
        .min(8, "Passowrd harus minimal 8 karakter!")
        .required("Password wajib diisi!")
        .matches(
          /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@!#%^&*()_+=-]{8,}$/,
          "Passowrd harus memiliki kombinasi huruf dan angka!"
        ),
      phone: yup.string().required("Nomor telepon wajib diisi!"),
    }),
    onSubmit: registerUser,
  });

  return (
    <>
      <div className="flex justify-center lg:mt-10">
        <div className="mx-4 p-4 mt-20 shadow rounded bg-white mb-10 w-[400px] ">
          <h1 className="text-2xl font-semibold text-center">Form Register</h1>
          <form onSubmit={formik.handleSubmit} className="mt-2 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm">
                Nama Lengkap
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 border border-gray-300 rounded-xl mt-1"
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.name}
                </div>
              ) : null}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 border border-gray-300 rounded-xl mt-1"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 border border-gray-300 rounded-xl mt-1"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 border border-gray-300 rounded-xl mt-1"
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.phone}
                </div>
              ) : null}
            </div>

            <div className="text-center">
              <button
                type="submit"
                className={`w-full p-2 mt-4 text-white bg-primary rounded-xl ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>
          <div className="mt-6">
            <p className="text-sm text-center">
              Sudah punya akun?{" "}
              <Link
                href="/signin"
                className="font-medium text-primary hover:underline"
              >
                Login disini
              </Link>
            </p>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
