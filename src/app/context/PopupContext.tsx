"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type PopupContextType = {
  isFontSizePopupOpen: boolean;
  isSharePopupOpen: boolean;
  fontSize: number;
  openFontSizePopup: () => void;
  closeFontSizePopup: () => void;
  openSharePopup: () => void;
  closeSharePopup: () => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
};

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export function PopupProvider({ children }: { children: ReactNode }) {
  const [isFontSizePopupOpen, setIsFontSizePopupOpen] = useState(false);
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const fontSizes = [14, 16, 18, 20];

  useEffect(() => {
    const body = document.body;
    if (isFontSizePopupOpen || isSharePopupOpen) {
      const scrollY = window.scrollY;
      body.style.position = "fixed";
      body.style.width = "100%";
      body.style.top = `-${scrollY}px`;
    } else {
      const scrollY = body.style.top;
      body.style.position = "";
      body.style.width = "";
      body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }

    return () => {
      body.style.position = "";
      body.style.width = "";
      body.style.top = "";
    };
  }, [isFontSizePopupOpen, isSharePopupOpen]);

  const openFontSizePopup = () => setIsFontSizePopupOpen(true);
  const closeFontSizePopup = () => setIsFontSizePopupOpen(false);
  const openSharePopup = () => setIsSharePopupOpen(true);
  const closeSharePopup = () => setIsSharePopupOpen(false);

  const increaseFontSize = () => {
    setFontSize((prevSize) => {
      const currentIndex = fontSizes.indexOf(prevSize);
      return currentIndex < fontSizes.length - 1
        ? fontSizes[currentIndex + 1]
        : prevSize;
    });
  };

  const decreaseFontSize = () => {
    setFontSize((prevSize) => {
      const currentIndex = fontSizes.indexOf(prevSize);
      return currentIndex > 0 ? fontSizes[currentIndex - 1] : prevSize;
    });
  };

  return (
    <PopupContext.Provider
      value={{
        isFontSizePopupOpen,
        isSharePopupOpen,
        fontSize,
        openFontSizePopup,
        closeFontSizePopup,
        openSharePopup,
        closeSharePopup,
        increaseFontSize,
        decreaseFontSize,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
}

export function usePopup() {
  const context = useContext(PopupContext);
  if (context === undefined) {
    throw new Error("usePopup must be used within a PopupProvider");
  }
  return context;
}
