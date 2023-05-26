import { faHeart, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { SidebarPlaylist } from "./SidebarPlaylist";
import { useRouter } from "next/navigation";

export function Sidebar() {
  const router = useRouter();
    const menu = [
        {
            icon:  <FontAwesomeIcon icon={faHome}/>,
            name: "Home",
            href: "/"
        },
        {
            icon: <FontAwesomeIcon icon={faHeart}/>,
            name: "Likes",
            href: "/"
        }
    ];
    
    
    return <div id="sidebar" className='lg:block fixed no-scrollbar hidden left-0 h-screen max-h-screen overflow-y-scroll bg-base-300 p-12 shadow w-[300px]'>
    <h1 className="font-bold text-xl">MENU</h1>
    <div className="h-[0.8rem]"></div>
    <ul className="flex flex-col gap-y-2">
      {menu.map((m, i) =>
      <li onClick={() => router.push(m.href)} key={i} className='cursor-pointer flex justify-center items-center gap-4 rounded-md bg-base-100'>
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