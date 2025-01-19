import { IconLine } from "@/app/assets/icons";
import Image from "next/image";
import React from "react";

export default function KolomKomentar() {
  return (
    <>
      <div className="mt-4 mx-4">
        <div className="bg-slate-50 rounded p-2">
          <h2 className="font-semibold text-primary text-xl">4 Komentar</h2>
          <IconLine />
          <div className="mt-4">
            <form action="">
              <input
                type="text"
                placeholder="Tulis komentar..."
                className="border w-full text-sm min-h-14 border-gray-300 px-4 py-2 focus:border-primary focus:outline-none"
              />
              <div className="flex">
                <button className="bg-primary text-white ms-auto text-sm px-4 mt-2  py-1">
                  Kirim
                </button>
              </div>
            </form>
            <div className="mt-4 ">
              <div className="flex  gap-2 ">
                <Image
                  src="/user.jpg"
                  width={100}
                  height={100}
                  alt="avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="">
                  <p className="text-sm font-semibold">Yoga Febriatala</p>
                  <p className="text-xs">
                    Jadi bingung mau komentar apa, apa ajalah yang penting
                    ngetes komentar
                  </p>
                  <div className="flex items-center gap-2 text-[10px] font-medium mt-1 text-gray-400">
                    <p>1 jam yang lalu</p>
                    <p className="flex items-center">(99+) Suka</p>
                    <p className=""> Balasan</p>
                    <p className="">Laporkan</p>
                  </div>
                </div>
              </div>
              <div className="flex mt-3  gap-2">
                <Image
                  src="/user2.jpg"
                  width={100}
                  height={100}
                  alt="avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="">
                  <p className="text-sm font-semibold">Gusti Maulana</p>
                  <p className="text-xs">
                    Kalo dipikir pikir, mancing enak ni di empang orang
                  </p>
                  <div className="flex items-center gap-2 text-[10px] font-medium mt-1 text-gray-400">
                    <p>1 jam yang lalu</p>
                    <p className="flex items-center">(99+) Suka</p>
                    <p className="font-bold">Balasan</p>
                    <p className="">Laporkan</p>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Image
                      src="/user.jpg"
                      width={100}
                      height={100}
                      alt="avatar"
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div className="">
                      <p className="text-xs font-semibold">Yoga Febriatala</p>
                      <p className="text-[11px]">Ngopi ngopi ngopi</p>
                      <div className="flex items-center gap-2 text-[10px] font-medium mt-1 text-gray-400">
                        <p>1 jam yang lalu</p>
                        <p className="flex items-center">(99+) Suka</p>

                        <p className="">Balas</p>
                        <p className="">Laporkan</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Image
                      src="/user3.jpg"
                      width={100}
                      height={100}
                      alt="avatar"
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div className="">
                      <p className="text-xs font-semibold">Jupri Nugroho</p>
                      <p className="text-[11px]">
                        <span className="font-semibold">@Yoga Febriatala </span>
                        Ngopi bari mancing
                      </p>
                      <div className="flex items-center gap-2 text-[10px] font-medium mt-1 text-gray-400">
                        <p>1 jam yang lalu</p>
                        <p className="flex items-center">(99+) Suka</p>

                        <p className="">Balas</p>
                        <p className="">Laporkan</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
