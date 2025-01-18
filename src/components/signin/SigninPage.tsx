"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Email tidak valid")
        .required("Email wajib diisi"),
      password: yup.string().required("Password wajib diisi"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const result = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        if (result?.ok) {
          router.push("/");
          window.location.reload();
        } else {
          alert("Login gagal. Silakan coba lagi.");
        }
      } catch (error) {
        alert("Login gagal. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <section className="bg-white text-primarydark mx-4 lg:mx-0">
        <div className="flex flex-col items-center justify-center mx-auto lg:py-0 lg:mt-[180px] lg:mb-44 mt-[130px] mb-24">
          <div className="w-full bg-white rounded-xl shadow sm:max-w-md xl:p-0">
            <div className="p-6">
              <h1 className="text-3xl mb-2 font-bold leading-tight tracking-tight md:text-[60px]">
                Login
              </h1>

              <p className="text-[12px] mb-6 font-light text-gray-400 dark:text-gray-400">
                Silakan login untuk bisa menulis dan berbagi cerita lebih banyak
                lagi.
              </p>
              <form className="text-sm" onSubmit={formik.handleSubmit}>
                <div className="mb-2">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`bg-gray-50 mt-2 border rounded-xl block w-full p-3 outline-none ${
                      formik.touched.email && formik.errors.email
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Email"
                    required
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="password">Kata sandi</label>
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Kata sandi"
                      className={`bg-gray-50 border rounded-xl mt-2 block w-full p-3 outline-none ${
                        formik.touched.password && formik.errors.password
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      required
                    />
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.password}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className={`w-full text-white bg-primary mt-6 hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-xl text-sm px-5 py-3 text-center ${
                    loading || !formik.isValid
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={loading || !formik.isValid}
                >
                  {loading ? "Loading..." : "Login"}
                </button>
              </form>
              <div className="mt-6">
                <p className="text-sm text-center">
                  Belum punya akun?{" "}
                  <Link
                    href="/register"
                    className="font-medium text-primary hover:underline"
                  >
                    Daftar sekarang
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
}
