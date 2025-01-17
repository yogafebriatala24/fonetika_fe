"use client";

import { motion } from "framer-motion";

interface FontSizePopupProps {
  isOpen: boolean;
  onClose: () => void;
  fontSize: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export function FontSizePopup({
  isOpen,
  onClose,
  fontSize,
  onIncrease,
  onDecrease,
}: FontSizePopupProps) {
  const fontSizes = [14, 16, 18, 20];

  const getFontSizeLabel = (size: number) => {
    switch (size) {
      case 14:
        return "Kecil";
      case 16:
        return "Normal";
      case 18:
        return "Besar";
      case 20:
        return "Sangat Besar";
      default:
        return "Normal";
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 w-full lg:flex lg:inset-0 lg:items-center lg:justify-center"
      >
        <div className="bg-white border shadow-md p-4 lg:w-[400px] lg:p-8 lg:rounded rounded-t-lg">
          <div className="flex gap-4 items-center justify-center">
            <button
              className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-md"
              onClick={onDecrease}
              disabled={fontSize === fontSizes[0]}
              style={{ opacity: fontSize === fontSizes[0] ? 0.5 : 1 }}
            >
              A-
            </button>
            <span className="">{getFontSizeLabel(fontSize)}</span>
            <button
              className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-md"
              onClick={onIncrease}
              disabled={fontSize === fontSizes[fontSizes.length - 1]}
              style={{
                opacity: fontSize === fontSizes[fontSizes.length - 1] ? 0.5 : 1,
              }}
            >
              A+
            </button>
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 w-full bg-gray-200 hover:bg-gray-300 rounded-md"
            >
              Tutup
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
