"use client";

import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import { Player } from "../lib/components/Player";
import { Navbar } from "../lib/components/Navbar";
import { useCallback } from "react";
import { Loader } from "../lib/components/Loader";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Sidebar } from "../lib/components/Sidebar";
import { BottomNav } from "../lib/components/BottomNav";

export default function PlaylistLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      return router.replace("/login");
    },
  });

  const getOAuthToken = useCallback(
    (cb: any) => {
      if (status === "authenticated") {
        cb(data.accessToken);
      }
    },
    [status, data]
  );

  if (status === "loading")
    return (
      <>
        <div className="flex h-screen">
          <Loader className="m-auto" />
        </div>
      </>
    );

  if (status === "authenticated") {
    const expiry = new Date(data.expires).getTime();
    if (Date.now() >= expiry) {
      signOut();
      router.replace("/login");
      return (
        <>
          <div className="flex h-screen">
            <Loader className="m-auto" />
          </div>
        </>
      );
    }
  }
  return (
    <>
      <Navbar />

      {/* @ts-expect-error-next-line */}
      <WebPlaybackSDK initialDeviceName="FrutBeats" initialVolume={1} getOAuthToken={getOAuthToken}>
        <div className="block lg:flex">
          <Sidebar />
          <div id="content">
            <div className="md:p-12 py-10 px-6 lg:translate-x-[300px] mt-12">{children}</div>
            <Player />
            <BottomNav />
          </div>
        </div>
      </WebPlaybackSDK>
    </>
  );
}
