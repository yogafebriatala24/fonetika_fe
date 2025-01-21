import Link from "next/link";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";

import { GrShieldSecurity } from "react-icons/gr";
import {
  MdOutlineSecurityUpdateGood,
  MdLockOutline,
  MdOutlineHelpOutline,
} from "react-icons/md";

export default function KelolaProfile() {
  return (
    <>
      <div className="mt-[80px] mx-4 lg:mx-0">
        <h1 className="flex justify-center text-xl text-primary font-medium">
          Kelola Akun
        </h1>
        <div className="grid grid-cols-2 gap-3 mt-4 bg-white p-4 shadow rounded">
          <div className="col-span-2 lg:col-span-1">
            <Link
              href="/profile/kelola-profile/edit-profile"
              className="border rounded flex bg-gray-50 items-center p-2 gap-2"
            >
              <FaRegUser /> Edit profil
              <IoIosArrowForward className="ms-auto" />
            </Link>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <Link
              href="/profile/kelola-profile/keamanan"
              className="border rounded flex bg-gray-50 items-center p-2 gap-2"
            >
              <GrShieldSecurity /> Keamanan
              <IoIosArrowForward className="ms-auto" />
            </Link>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <Link
              href="/profile/kelola-profile/aktivitas"
              className="border rounded flex bg-gray-50 items-center p-2 gap-2"
            >
              <MdOutlineSecurityUpdateGood /> Log Aktivitas
              <IoIosArrowForward className="ms-auto" />
            </Link>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <Link
              href="/profile/kelola-profile/kebijakan-privasi"
              className="border rounded flex bg-gray-50 items-center p-2 gap-2"
            >
              <MdLockOutline /> Kebijakan Privasi
              <IoIosArrowForward className="ms-auto" />
            </Link>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <Link
              href="/profile/kelola-profile/pusat-bantuan"
              className="border rounded flex bg-gray-50 items-center p-2 gap-2"
            >
              <MdOutlineHelpOutline /> Pusat Bantuan
              <IoIosArrowForward className="ms-auto" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
