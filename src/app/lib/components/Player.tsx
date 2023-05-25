import { faBackwardStep, faForwardStep, faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Player() {
    return <div id="player" className="flex hidden lg:block fixed bottom-0 bg-base-300 py-4 px-6">
        <div className="flex gap-x-4 items-center mx-auto">
            <FontAwesomeIcon icon={faBackwardStep} />
            <div className='rounded-full w-12 h-12 bg-primary flex items-center justify-center'>
                <FontAwesomeIcon className="m-auto" icon={faPause}/>
            </div>
            <FontAwesomeIcon icon={faForwardStep}/>
        </div>
        <progress className="progress progress-primary w-56" value="70" max="100"></progress>
    </div>
}