"use client";
import React from "react";

export default function ErrorComponent({ error }: { error: Error }) {
  return (
    <div>
      <h1>Something went wrong!</h1>
      <p>{error.message}</p>
    </div>
  );
}
