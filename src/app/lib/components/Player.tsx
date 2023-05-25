import { faBackwardStep, faForwardStep, faPause, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export function Player() {
    return <div id="player" className="grid-cols-9 justify-center hidden items-center lg:grid fixed bottom-0 bg-base-300 py-4 px-6">
        <div className="grid grid-cols-3 text-start gap-x-4 items-center justify-center">
            <Image
                src="/playlist.jpg"
                alt="Music Cover"
                width={64}
                height={64}
                className="rounded-md"
            />
            <div className="col-span-2">
                <h1 className="font-bold text-xl">Jealous</h1>
                <p className="font-semibold text-lg">Al-hitam</p>
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
            <p className="text-end">02:00</p>
            <progress className="progress progress-primary bg-base-content col-span-5 w-full" value="70" max="100"></progress>
            <p>04:32</p>
        </div>
        <div className="flex col-span-2">
            <button className="ml-auto btn btn-ghost btn-circle ">
                <FontAwesomeIcon icon={faStar} size="2x" className="text-primary"/>
            </button>
        </div>
    </div>
}