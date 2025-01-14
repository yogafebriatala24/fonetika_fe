"use client";

import { useState, useEffect } from "react";
import { usePopup } from "@/context/PopupContext";
import { FontSizePopup } from "./FontSize";
import { SharePopup } from "./Share";

export function PopupContainer() {
  const {
    isFontSizePopupOpen,
    isSharePopupOpen,
    fontSize,
    closeFontSizePopup,
    closeSharePopup,
    increaseFontSize,
    decreaseFontSize,
  } = usePopup();

  const [documentTitle, setDocumentTitle] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDocumentTitle(document.title);
    }
  }, []);

  return (
    <>
      <div className="relative">
        <FontSizePopup
          isOpen={isFontSizePopupOpen}
          onClose={closeFontSizePopup}
          fontSize={fontSize}
          onIncrease={increaseFontSize}
          onDecrease={decreaseFontSize}
        />

        <SharePopup
          isOpen={isSharePopupOpen}
          onClose={closeSharePopup}
          title={encodeURIComponent(documentTitle)}
        />
      </div>
    </>
  );
}
