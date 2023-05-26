"use client";
import { Loader } from "@/app/lib/components/Loader";
import { PlaylistItem } from "@/app/lib/components/PlaylistItem";
import { faMusic, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePlayerDevice, useSpotifyPlayer } from "react-spotify-web-playback-sdk";

export default function PlaylistDetail({ params }: { params: Params }) {
    const device = usePlayerDevice();
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
                        Authorization: `Bearer ${data?.accessToken}`
                    }
                });

                setPlaylistData(await res.json());
            }

            fetchPlaylistData();
        }
    });
    
    if (status === "loading" || !playlistData) return <div className="h-screen"><Loader className="m-auto"/></div>;
    
    const playPlaylist = (uri: string) => {
        if (device === null) return;
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device.device_id}`, {
            method: "PUT",
            body: JSON.stringify({ context_uri: uri, position_ms: 0 }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.accessToken}`,
            },
        });
    }

    console.log(playlistData);
    return (<>
        <div className="flex gap-x-4 flex-col md:flex-row gap-y-2">
            {playlistData.images.length > 0 &&
                <Image
                    src={playlistData.images[0]?.url}
                    width={150}
                    height={150}
                    className="rounded-lg w-full md:w-[150px]"
                    alt="Playlist Image"
                />
            }
            {!playlistData.images.length &&
            <div className="w-[150px] h-[150px] rounded-lg bg-gray-400 flex">
                <FontAwesomeIcon icon={faMusic} className="m-auto" size="2x"/></div>}
           <div className="flex flex-col gap-y-2">
                <h1 className="font-bold text-2xl">{playlistData?.name}</h1>
                <p className="font-normal text-gray-500">{playlistData.description}</p>
                <button className="btn btn-primary btn-circle text-white" onClick={() => playPlaylist(playlistData.uri)}><FontAwesomeIcon icon={faPlay}/></button>
            </div> 
        </div>

        
        <div className="flex flex-col w-full gap-y-2 mt-12 ">
            {playlistData.tracks.items.map((x: any, i: number) => 
                <PlaylistItem
                    key={i}
                    name={x.track?.name ?? "Unknown"}
                    artist={x.track?.artists[0]?.name ?? "Unknown"}
                    image={x.track?.album.images[0]?.url}
                    uri={x.track?.uri}
                    id={x.track?.id}
                />
            )}
        </div>
        <div className="h-[8rem]"></div>
    </>);
}