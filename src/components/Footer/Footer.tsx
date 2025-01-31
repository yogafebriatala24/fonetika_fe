import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  PiInstagramLogo,
  PiTwitterLogo,
  PiWhatsappLogo,
  PiYoutubeLogo,
} from "react-icons/pi";

export default function Footer() {
  return (
    <>
      <div className="border-t p-4  border-gray-200">
        <div className="flex justify-center">
          <Image
            src={"/fonetika-logo.png"}
            alt="Fonetika Logo"
            width={400}
            height={400}
            className="w-48 "
          />
        </div>
        <div className="flex items-center gap-4 mt-4 text-2xl justify-center">
          <PiInstagramLogo />
          <PiYoutubeLogo />
          <PiTwitterLogo />
          <PiWhatsappLogo />
        </div>
        <div className="flex flex-wrap gap-4 text-sm mt-4 justify-center">
          <Link href={"/"} className="font-medium">
            Redaksi
          </Link>
          <Link href={"/"} className="font-medium">
            Peta Situs
          </Link>
          <Link href={"/pedoman-siber"} className="font-medium">
            Pedoman Siber
          </Link>
          <Link href={"/"} className="font-medium">
            Kode Etik
          </Link>
          <Link href={"/"} className="font-medium">
            Ketentuan dan Layanan
          </Link>
        </div>
      </div>
      <div className="w-full max-md:hidden  p-1 mb-2 flex justify-center text-xs">
        <p>© 2025 PT Fonetika Digital Nusantara | All rights reserved.</p>
      </div>
    </>
  );
}
