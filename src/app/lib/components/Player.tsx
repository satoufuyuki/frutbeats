import { faBackwardStep, faForwardStep, faMusic, faPause, faPlay, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { usePlaybackState, usePlayerDevice, useSpotifyPlayer, useWebPlaybackSDKReady } from "react-spotify-web-playback-sdk";
import { readableTime } from "../utils/readableTime";
import { createRef, useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

const AlbumImageDefault = () => <div className="flex h-[64px] w-[64px] rounded-md bg-gray-400">
<FontAwesomeIcon icon={faMusic} className="m-auto text-xl"/>
</div>

export function Player() {
    const player = useSpotifyPlayer();
    const playbackState = usePlaybackState(true, 1000);
    const [playPauseDisabled, setPlayPauseDisabled] = useState(false);
    const [skipDisabled, setSkipDisabled] = useState(false);

    const playPause = () => {
        if (!playbackState?.track_window?.current_track || !player) return;
        setPlayPauseDisabled(true);
        if (playbackState.paused) {
            player.resume().then(() => setPlayPauseDisabled(false));
        } else {
            player.pause().then(() => setPlayPauseDisabled(false));
        }
    };

    const skip = (direction: "next" | "previous") => {
        if (!playbackState?.track_window?.current_track || !player) return;
        if (direction === "next" && playbackState.disallows.skipping_next) return;
        if (direction === "previous" && playbackState.disallows.skipping_prev) return;
        setPlayPauseDisabled(true);
        setSkipDisabled(true);

        switch (direction) {
            case "next":
                player.nextTrack().then(() => {
                    setPlayPauseDisabled(false);
                    setSkipDisabled(false);
                });
                break;
            case "previous":
                player.previousTrack().then(() => {
                    setPlayPauseDisabled(false);
                    setSkipDisabled(false);
                });
                break;
        }
    }

    return <div id="player"
        className="flex justify-between items-center fixed bg-base-300 py-4 px-6
            bottom-20 rounded-md shadow-md mx-5 w-11/12
            lg:bottom-0 lg:mx-0 lg:rounded-none lg:shadow-none lg:w-full
        "
    >
        <div className="flex text-start gap-x-4 items-center justify-center">
            {playbackState !== null && playbackState.track_window?.current_track?.album?.images.length > 0 ? (
                 <Image
                    src={playbackState.track_window.current_track.album.images[0].url}
                    alt="Music Cover"
                    width={64}
                    height={64}
                    className="rounded-md w-[39px] h-[39px] lg:w-[64px] lg:h-[64px]"
                />
            ) : <AlbumImageDefault/>}
            <div className="col-span-2 max-w-[15rem] overflow-hidden">
                <div id="player-title" className="font-bold text-normal lg:text-xl text-slate-100 whitespace-nowrap">
                    {(() => {
                        const title = playbackState?.track_window?.current_track?.name ?? "Not Playing";
                        return title.length > 15
                            ?   <Marquee speed={15}>
                                    <h1>{title}</h1>
                                </Marquee>
                            : <h1>{title}</h1>
                    })()}
                </div>
                
                <p className="font-normal text-sm text-slate-300">{playbackState
                    ? playbackState.track_window?.current_track?.artists[0]?.name : "Unknown"}</p>
            </div>
        </div>
        <div className="hidden lg:grid grid-cols-10 items-center justify-center gap-x-4">
            <div className="flex justify-center items-center gap-x-5 col-span-3">
                <button className={`btn btn-ghost text-white ${playbackState?.disallows?.skipping_prev || skipDisabled ? "btn-disabled" : ""}`} disabled={(playbackState?.disallows?.skipping_prev || skipDisabled) ?? false} onClick={() => skip("previous")}>
                    <FontAwesomeIcon className="text-xl" icon={faBackwardStep} />
                </button>
                <button className={`btn btn-primary btn-circle text-white ${playPauseDisabled ? "btn-disabled" : ""}`} disabled={playPauseDisabled} onClick={() => playPause()}>
                    {playbackState?.paused ? <FontAwesomeIcon icon={faPlay}/> : <FontAwesomeIcon icon={faPause}/>}
                </button>
                <button className={`btn btn-ghost text-white ${playbackState?.disallows?.skipping_next || skipDisabled ? "btn-disabled" : ""}`} disabled={(playbackState?.disallows?.skipping_next || skipDisabled) ?? false} onClick={() => skip("next")}>
                    <FontAwesomeIcon className="text-xl" icon={faForwardStep} />
                </button>
            </div>
            
            <p className="text-end">{readableTime(playbackState?.position ?? 0)}</p>
            <progress className="progress progress-primary bg-base-content col-span-5 w-full" value={(playbackState?.position ?? 0) / (playbackState?.track_window?.current_track?.duration_ms ?? 0) * 100} max="100"></progress>
            <p>{readableTime(playbackState?.track_window?.current_track?.duration_ms ?? 0)}</p>
        </div>
        <div className="col-span-2 hidden lg:flex">
            <button className="ml-auto btn btn-ghost btn-circle ">
                <FontAwesomeIcon icon={faStar} size="2x" className="text-primary"/>
            </button>
        </div>
        <div className="col-span-2 block lg:hidden">
            <button className={`btn btn-circle text-white ${playPauseDisabled ? "btn-disabled" : ""}`} disabled={playPauseDisabled} onClick={() => playPause()}>
                {playbackState?.paused ? <FontAwesomeIcon icon={faPlay}/> : <FontAwesomeIcon icon={faPause}/>}
            </button>
        </div>
    </div>
}