"use client";
import { PopupProvider } from "../context/PopupContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <PopupProvider>{children}</PopupProvider>;
}
