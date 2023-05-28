"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader } from "../lib/components/Loader";
import { Meta } from "../lib/components/Meta";

export default function Logout() {
  const { status } = useSession();
  const router = useRouter();
  if (status === "authenticated") {
    signOut();
    router.replace("/");
  } else if (status === "unauthenticated") {
    router.replace("/");
  }

  return (
    <>
      <Meta title="Login" />
      <div className="flex h-screen">
        <Loader className="m-auto" />
      </div>
    </>
  );
}
