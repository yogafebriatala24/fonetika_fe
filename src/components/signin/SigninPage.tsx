"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Metadata } from "next";
import { IconEye, IconEyeOff, IconPatternLoginCanon } from "@/app/(auth)/icons";

const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@!#%^&*()_+=-]{8,}$/;
  return passwordRegex.test(password);
};

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const SignInPage: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");
  const [emailBorderColor, setEmailBorderColor] =
    useState<string>("border-gray-300");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (!validateEmail(newEmail)) {
      setEmailBorderColor("border-primary");
    } else {
      setEmailBorderColor("border-gray-300");
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.ok) {
        router.push("/");
        window.location.reload();
      } else {
        setError("Login gagal. Silakan coba lagi.");
      }
    } catch (error) {
      setError("Terjadi kesalahan saat login.");
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled =
    !email || !validateEmail(email) || !password || loading;

  return (
    <>
      <section className="bg-white text-primarydark mx-4 lg:mx-0">
        <div className="flex flex-col items-center justify-center  mx-auto  lg:py-0 lg:mt-[180px] lg:mb-44 mt-[130px] mb-24">
          <div className="w-full bg-white rounded-xl shadow  sm:max-w-md xl:p-0">
            <div className="p-6">
              <h1 className="text-3xl mb-2 font-bold leading-tight tracking-tight md:text-[60px]">
                Login
              </h1>

              <p className="text-[12px] mb-6 font-light text-gray-400 dark:text-gray-400">
                Silakan login untuk bisa menulis dan berbagi cerita lebih banyak
                lagi.
              </p>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <form className=" text-sm" onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label htmlFor="email" className=" ">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    className={`bg-gray-50 mt-2 border rounded-xl block w-full p-3 outline-none ${emailBorderColor}`}
                    placeholder="Email"
                    required
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm mt-1">{emailError}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="password" className="">
                    Kata sandi
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Kata sandi"
                      className={`bg-gray-50 border rounded-xl mt-2 block w-full p-3 outline-none ${
                        passwordError ? "border-primary" : ""
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={handleTogglePasswordVisibility}
                      className="absolute inset-y-0 right-3 flex items-center"
                    >
                      {showPassword ? <IconEyeOff /> : <IconEye />}
                    </button>
                  </div>
                  {passwordError && (
                    <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className={`w-full text-white bg-primary mt-6 hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-xl text-sm px-5 py-3 text-center ${
                    isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
                  } disabled:bg-[#F3F4F8] disabled:text-gray-400`}
                >
                  {loading ? "Loading..." : "Login"}
                </button>
                <Link
                  href={"/register"}
                  className="mt-4 focus:underline text-primary font-semibold flex justify-center"
                >
                  Belum Punya Akun?
                </Link>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignInPage;
