import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Mendapatkan direktori file saat ini
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Membuat instance FlatCompat untuk kompatibilitas konfigurasi
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Mengonfigurasi ESLint dengan ekstensi dan aturan khusus
const eslintConfig = {
  extends: [...compat.extends("next/core-web-vitals", "next/typescript")],
  rules: {
    "@typescript-eslint/no-require-imports": "off",
    "react/prop-types": "off",
  },
};

export default eslintConfig;
