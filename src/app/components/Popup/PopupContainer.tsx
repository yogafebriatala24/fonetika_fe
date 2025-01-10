"use client";

import { usePopup } from "@/app/context/PopupContext";
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
          title={encodeURIComponent(document.title)}
        />
      </div>
    </>
  );
}
