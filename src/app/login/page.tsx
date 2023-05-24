"use client";

import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader } from "../lib/components/Loader";

export default function Login() {
    const { status } = useSession();
    const router = useRouter();
    if (status === "loading") {
        return <>
            <div className="flex h-screen"><Loader className='m-auto'/></div>
        </>
    }

    if (status === "authenticated") {
        router.replace("/");
        return <>
            <div className="flex h-screen"><Loader className='m-auto'/></div>
        </>
    }

    return <>
        <Image
            src="/logo.svg"
            width={150}
            height={500}
            alt="FrutBits Logo"
            className="right-0 rotate-[30deg] fixed top-0 animate-[svg-right-waves_5s_infinite_alternate] "
        />
        
        <div className="flex h-screen">
            <div className="w-full m-auto text-center gap-y-2 flex flex-col justify-center">
                <h1 className="font-bold text-2xl">Get Started</h1>
                <button onClick={() => signIn("spotify", { redirect: true })} className="btn gap-2 mx-auto">
                    <FontAwesomeIcon icon={faSpotify} size="2x" className="w-7"/>
                    Connect with Spotify
                </button>
            </div>
        </div>
        <Image
            src="/logo.svg"
            width={150}
            height={500}
            alt="FrutBits Logo"
            className="rotate-[30deg] fixed bottom-0 animate-[svg-left-waves_5s_infinite_alternate] "
        />
    </>
}