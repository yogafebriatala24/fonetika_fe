import React from "react";
import Header from "../components/Header/Header";
import Terbaru from "./terbaru/page";
import Footer from "../components/Footer/Footer";

export default function MainPage() {
  return (
    <>
      <div className="">
        <Header />
        <div className="max-w-4xl mx-auto">
          <Terbaru />
        </div>
        <div className="absolute bottom-0">
          <Footer />
        </div>
      </div>
    </>
  );
}
