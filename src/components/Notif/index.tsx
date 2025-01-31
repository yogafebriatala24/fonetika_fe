"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function NotificationPrompt() {
  const [permission, setPermission] =
    useState<NotificationPermission>("default");
  const [isLoading, setIsLoading] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (
      isHydrated &&
      typeof window !== "undefined" &&
      "Notification" in window
    ) {
      const status = localStorage.getItem("notificationPromptStatus");

      if (status === "granted" || status === "denied") {
        setShowPrompt(false);
      }

      if (showPrompt && window.innerWidth < 1024) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }
  }, [showPrompt, isHydrated]);

  const handleClose = () => {
    setShowPrompt(false);
  };

  const requestNotificationPermission = async () => {
    try {
      if (typeof window !== "undefined" && "Notification" in window) {
        setIsLoading(true);
        const result = await Notification.requestPermission();
        setPermission(result);

        if (result === "granted") {
          console.log("Notification permission granted!");
          localStorage.setItem("notificationPromptStatus", "granted");
        } else {
          console.log("Notification permission denied.");
          localStorage.setItem("notificationPromptStatus", "denied");
        }

        handleClose();
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      handleClose();
    } finally {
      setIsLoading(false);
    }
  };

  if (
    !isHydrated ||
    !showPrompt ||
    permission === "granted" ||
    permission === "denied" ||
    typeof window === "undefined" ||
    !("Notification" in window)
  ) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 lg:flex lg:items-center lg:justify-center bg-black bg-opacity-25 lg:bg-opacity-0">
      <div className="p-4 rounded-lg lg:rounded-none h-fit shadow-lg w-full max-w-md bg-white absolute bottom-0 lg:top-0 lg:max-h-[80vh] lg:overflow-y-auto">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-4">
            <Image
              src="/logo2.png"
              alt="logo"
              width={200}
              height={200}
              className="w-full object-cover"
            />
          </div>
          <div className="col-span-8 lg:my-auto">
            <p className="text-right text-gray-600 mt-4">
              Nyalakan notifikasi untuk mendapatkan update berita terkini
            </p>

            <div className="flex justify-end mt-4 gap-4">
              <button
                onClick={requestNotificationPermission}
                disabled={isLoading}
                className="bg-gray-400 text-center text-white py-2 px-4 rounded-lg transition-colors hover:bg-primary-dark disabled:opacity-50"
              >
                Tidak
              </button>
              <button
                onClick={requestNotificationPermission}
                disabled={isLoading}
                className="bg-primary text-center text-white py-2 px-4 rounded-lg transition-colors hover:bg-primary-dark disabled:opacity-50"
              >
                Izinkan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
