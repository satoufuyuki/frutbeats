"use client";
import { Loader } from "@/app/lib/components/Loader";
import { faMusic, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PlaylistDetail({ params }: { params: Params }) {
    const router = useRouter();
    const { data, status } = useSession({
        required: true,
        onUnauthenticated() {
            return router.replace("/login");        
        },
    });

    const id = params.id;
    const [playlistData, setPlaylistData] = useState<any>(undefined);
    useEffect(() => {
        if (!playlistData) {
            const fetchPlaylistData = async() => {
                const res = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
                    headers: {
                        Authorization: `Bearer ${data?.access_token}`
                    }
                });

                setPlaylistData(await res.json());
            }

            fetchPlaylistData();
        }
    });

    console.log(playlistData);
    
    if (status === "loading" || !playlistData) return <div className="h-screen"><Loader className="m-auto"/></div>;
    
    return (<>
        <div className="flex gap-x-4 ">
            {playlistData.images.length > 0 &&
                <Image
                    src={playlistData.images[0]?.url}
                    width={150}
                    height={150}
                    className="rounded-lg"
                    alt="Playlist Image"
                />
            }
            {!playlistData.images.length &&
            <div className="w-[150px] h-[150px] rounded-lg bg-gray-400 flex">
                <FontAwesomeIcon icon={faMusic} className="m-auto" size="2x"/></div>}
           <div className="flex flex-col gap-y-2">
                <h1 className="font-bold text-2xl">{playlistData.name}</h1>
                <p className="font-normal text-gray-500">{playlistData.description}</p>
                <button className="btn btn-primary btn-circle text-white"><FontAwesomeIcon icon={faPlay}/></button>
            </div>  
        </div>
    </>);
}