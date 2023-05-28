"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Navbar() {
  const { status, data } = useSession();
  const router = useRouter();
  return (
    <div className="navbar z-10 fixed top-0 bg-base-300 shadow">
      <div className="navbar-start">
        <Image className="m-2 cursor-pointer" onClick={() => router.push("/")} src="/logo.svg" width={20} height={20} alt="FrutBits Logo" />
      </div>
      <div className="navbar-center">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          FrutBeats
        </Link>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-bottom dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            {["loading", "unauthenticated"].includes(status) && <div className="w-[35px] h-[35px] rounded-full animate-pulse bg-gray-500"></div>}
            {status === "authenticated" && data.user && <Image width={35} height={35} src={data.user.image ?? "/playlist.jpg"} className="rounded-full" alt="Avatar" />}
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-300 rounded-box w-52">
            <li>
              <Link href="/logout">
                <span>
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </span>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
