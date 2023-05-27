"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  const { status, data } = useSession();
  return (
    <div className="navbar z-10 fixed top-0 bg-base-300 shadow">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a>Homepage</a>
            </li>
            <li>
              <a>Portfolio</a>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-xl">FrutBeats</a>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-bottom dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            {["loading", "unauthenticated"].includes(status) && <div className="w-[35px] h-[35px] rounded-full animate-pulse bg-gray-500"></div>}
            {status === "authenticated" && data.user && (
              <Image
                width={35}
                height={35}
                src={"https://cdn.discordapp.com/attachments/1080868875375231066/1110876833177669683/57c879d00ac973db14296947d673fe7d.jpg"}
                className="rounded-full"
                alt="Avatar"
              />
            )}
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
