import { faBackwardStep, faForwardStep, faMusic, faPause, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { usePlaybackState, useWebPlaybackSDKReady } from "react-spotify-web-playback-sdk";

export function Player() {
    const webPlaybackSDKReady = useWebPlaybackSDKReady();

    // console.log(playbackState, webPlaybackSDKReady);
    return <div id="player" className="justify-around hidden items-center lg:flex fixed bottom-0 bg-base-300 py-4 px-6">
        <div className="grid grid-cols-3 text-start gap-x-4 items-center justify-center">
            {/* <Image
                src="/playlist.jpg"
                alt="Music Cover"
                width={64}
                height={64}
                className="rounded-md"
            /> */}
            <div className="flex h-[64px] w-[64px] rounded-md bg-gray-400">
                <FontAwesomeIcon icon={faMusic} className="m-auto text-xl"/>
            </div>
            <div className="col-span-2">
                {/* <div className="w-11 h-2 bg-gray-400 rounded-md animate-pulse"></div>
                <div className="mt-1 w-24 h-2 bg-gray-400 rounded-md animate-pulse"></div> */}
                <h1 className="font-bold text-xl text-slate-100">Not Playing</h1>
                <p className="font-normal text-sm text-slate-300">Unknown</p>
            </div>
        </div>
        <div className="col-span-5 grid grid-cols-10 items-center justify-center gap-x-4">
            <div className="flex justify-center items-center gap-x-5 col-span-3">
                <FontAwesomeIcon className="text-xl" icon={faBackwardStep} />
                <div className='rounded-full w-12 h-12 bg-primary flex items-center justify-center'>
                    <FontAwesomeIcon className="text-xl m-auto" icon={faPause}/>
                </div>
                <FontAwesomeIcon className="text-xl" icon={faForwardStep}/>
            </div>
            
            <p className="text-end">00:00</p>
            <progress className="progress progress-primary bg-base-content col-span-5 w-full" value="0" max="100"></progress>
            <p>00:00</p>
            {/* <div className="w-11 h-2 bg-gray-400 rounded-md animate-pulse"></div> */}
        </div>
        <div className="flex col-span-2">
            <button className="ml-auto btn btn-ghost btn-circle ">
                <FontAwesomeIcon icon={faStar} size="2x" className="text-primary"/>
            </button>
        </div>
    </div>
}