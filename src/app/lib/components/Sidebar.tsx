import { faHeart, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { SidebarPlaylist } from "./SidebarPlaylist";

export function Sidebar() {
    const menu = [
        {
            icon:  <FontAwesomeIcon icon={faHome}/>,
            name: "Home"
        },
        {
            icon: <FontAwesomeIcon icon={faHeart}/>,
            name: "Likes"
        }
    ];
    
    
    return <div id="sidebar" className='no-scrollbar fixed left-0 h-screen max-h-screen overflow-y-scroll bg-base-300 p-12 shadow w-[25%]'>
    <h1 className="font-bold text-xl">MENU</h1>
    <div className="h-[0.8rem]"></div>
    <ul className="flex flex-col gap-y-2">
      {menu.map((m, i) =>
      <li key={i} className='flex justify-center items-center gap-4 rounded-md bg-base-100'>
        <div className='flex items-center justify-center w-10 bg-primary p-2 rounded-l-md'>
          {m.icon}
        </div>
        <p className='font-bold w-full'>{m.name}</p>
      </li>
      )}
    </ul>
    <br/>
    <br/>
    <h1 className="font-bold text-xl">YOUR PLAYLIST</h1>
    <div className="h-[0.8rem]"></div>
    <SidebarPlaylist/>
    <div className="h-[2rem]"></div>
  </div>
}