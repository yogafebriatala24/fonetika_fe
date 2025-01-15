"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    image: null as File | null,
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      setError("Image is required.");
      return;
    }

    setLoading(true);
    setError(null);

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("phone", formData.phone);
    form.append("image", formData.image);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: form,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        router.push("/signin");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className=" mx-4 p-4 mt-20 shadow rounded bg-white mb-10">
        <h1 className="text-2xl font-semibold text-center">Register</h1>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        <form onSubmit={handleSubmit} className="mt-2 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-xl mt-1"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-xl mt-1"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-xl mt-1"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-xl mt-1"
              required
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm">
              Profile Image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-xl mt-1"
              required
            />
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
      </div>
    </>
  );
}
