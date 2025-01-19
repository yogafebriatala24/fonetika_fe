import { FaHome, FaNewspaper, FaUser } from "react-icons/fa";
import Link from "next/link";
import { RiDiscussFill } from "react-icons/ri";
import { useSession } from "next-auth/react";
import { FaPenToSquare } from "react-icons/fa6";

const BottomNav = () => {
  const { data: session } = useSession();
  return (
    <nav className="fixed bottom-0 border-t left-0 w-full bg-white shadow-xl md:hidden rounded-t-xl">
      <ul className="flex justify-around py-3">
        <li>
          <Link href="/">
            <p className="flex active:scale-90 transition-all duration-200 flex-col items-center text-gray-700 hover:text-primary">
              <FaHome className="h-6 w-6" />
              <span className="text-xs">Home</span>
            </p>
          </Link>
        </li>
        <li>
          <Link href="/">
            <p className="flex flex-col items-center active:scale-90 transition-all duration-100 text-gray-700 hover:text-primary">
              <FaNewspaper className="h-6 w-6" />
              <span className="text-xs">Terbaru</span>
            </p>
          </Link>
        </li>
        <li>
          <Link href="/forum">
            <p className="flex flex-col items-center active:scale-90 transition-all duration-100 text-gray-700 hover:text-primary">
              <RiDiscussFill className="h-6 w-6" />
              <span className="text-xs">Forum</span>
            </p>
          </Link>
        </li>
        <li>
          <Link href={"/profile/create-berita"}>
            <p className="flex flex-col items-center active:scale-90 transition-all duration-100 text-gray-700 hover:text-primary">
              <FaPenToSquare className="h-6 w-6" />
              <span className="text-xs">Menulis</span>
            </p>
          </Link>
        </li>
        {session ? (
          <li>
            <Link href={`/profile/${session.user.uuid}`}>
              <p className="flex flex-col items-center active:scale-90 transition-all duration-100 text-gray-700 hover:text-primary">
                <FaUser className="h-6 w-6" />
                <span className="text-xs">Profile</span>
              </p>
            </Link>
          </li>
        ) : (
          ""
        )}
      </ul>
    </nav>
  );
};

export default BottomNav;
