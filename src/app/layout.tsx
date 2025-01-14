"use client";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Providers } from "./providers";
import { PopupContainer } from "../components/Popup/PopupContainer";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import ErrorComponent from "./error";
import BottomNav from "../components/NavBottom/NavBottom";
import { SessionProvider } from "next-auth/react";

const figtree = Figtree({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
  preload: true,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figtree.className} antialiased `}>
        <SessionProvider>
          <Providers>
            <PopupContainer />
            <Header />
            <div className=" lg:max-w-6xl max-w-full  mx-auto">
              <ErrorBoundary errorComponent={ErrorComponent}>
                {children}
              </ErrorBoundary>
            </div>
            <div className="mt-4">
              <div className="mb-14 lg:mb-0 md:mb-0">
                <Footer />
              </div>
              <BottomNav />
            </div>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
