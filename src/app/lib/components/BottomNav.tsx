import { faBook, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter } from "next/navigation";

export function BottomNav() {
    const pathname = usePathname();
    const router = useRouter();
    const menu = [
        {
            icon: <FontAwesomeIcon icon={faHome}/>,
            name: "Home",
            href: "/"
        },
        {
            icon: <FontAwesomeIcon icon={faBook}/>,
            name: "Library",
            href: "/library"
        }
    ]

    return (
        <div className="btm-nav lg:hidden shadow-md">
            {menu.map((item, index) => (
                <button onClick={() => router.push(item.href)}  key={index} className={pathname === item.href ? "active" : ""}>
                    {item.icon}
                    <span className="btm-nav-label">{item.name}</span>
                </button>
            ))}
        </div>
    )
}