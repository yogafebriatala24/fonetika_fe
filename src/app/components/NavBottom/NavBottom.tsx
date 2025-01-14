import { FaHome, FaFire, FaNewspaper, FaUser } from "react-icons/fa";
import Link from "next/link";
import { RiDiscussFill } from "react-icons/ri";

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 border-t left-0 w-full bg-white shadow-xl md:hidden">
      <ul className="flex justify-around py-3">
        <li>
          <Link href="/">
            <p className="flex flex-col items-center text-gray-700 hover:text-primary">
              <FaHome className="h-6 w-6" />
              <span className="text-xs">Home</span>
            </p>
          </Link>
        </li>
        <li>
          <Link href="/search">
            <p className="flex flex-col items-center text-gray-700 hover:text-primary">
              <FaNewspaper className="h-6 w-6" />
              <span className="text-xs">Terbaru</span>
            </p>
          </Link>
        </li>
        <li>
          <Link href="/search">
            <p className="flex flex-col items-center text-gray-700 hover:text-primary">
              <RiDiscussFill className="h-6 w-6" />
              <span className="text-xs">Forum</span>
            </p>
          </Link>
        </li>
        <li>
          <Link href="/notifications">
            <p className="flex flex-col items-center text-gray-700 hover:text-primary">
              <FaFire className="h-6 w-6" />
              <span className="text-xs">Populer</span>
            </p>
          </Link>
        </li>
        <li>
          <Link href="/profile">
            <p className="flex flex-col items-center text-gray-700 hover:text-primary">
              <FaUser className="h-6 w-6" />
              <span className="text-xs">Profile</span>
            </p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default BottomNav;