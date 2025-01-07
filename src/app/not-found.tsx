"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 4000);
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen text-white bg-secondColor">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="mt-4 text-lg">Page Not Found</p>
      </div>
    </div>
  );
}
