import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePlayerDevice } from "react-spotify-web-playback-sdk";

export function PlaylistItem({ name, artist, image, id, uri }: { name: string, artist: string, image: string, id: string, uri: string }) {
    const device = usePlayerDevice();
    const { data } = useSession({
        required: true
    });

    const play = (uri: string) => {
        if (device === null) return;
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device.device_id}`, {
            method: "PUT",
            body: JSON.stringify({ uris: [uri], position_ms: 0 }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data?.accessToken}`,
            },
        });
    }

    return <div className="px-4 py-4 gap-x-4 justify-between
        items-center flex bg-base-300 rounded shadow w-full">
        <div className="flex gap-x-4">
            <Image src={image}
                width={50} height={50} alt="Playlist Track"/>
            <div className="grid grid-rows-2 grid-flow-row">
                <a className="font-bold text-xl whitespace-nowrap overflow-hidden" title={name}>{name}</a>
                <p className="font-normal text-sm">{artist}</p>
            </div>
        </div>
        <button className="btn btn-ghost btn-circle" onClick={() => play(uri)}>
            <FontAwesomeIcon icon={faPlay} className="text-xl"/>
        </button>
    </div>
}