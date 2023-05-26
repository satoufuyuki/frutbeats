"use client";
import { SidebarPlaylist } from "@/app/lib/components/SidebarPlaylist";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
    const router = useRouter();
    const { status, data } = useSession({
        required: true,
        onUnauthenticated() {
          return router.replace('/login')
        },
      });
    
    return (<>
    <div className="flex justify-between items-start flex-col lg:flex-row lg:items-center gap-y-4">
      <h1 className='font-bold text-3xl'>Your Playlists</h1>
    </div>
    <br/>
    <SidebarPlaylist/>
    <div className="h-[10rem]"></div>
    </>
    )
}