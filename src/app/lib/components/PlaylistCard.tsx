import Image from "next/image";
import { useRouter } from "next/navigation";

export function PlaylistCard({ skeleton = false, id, image, title, description }: { id?: string; skeleton?: boolean; image?: string; title?: string; description?: string }) {
  const router = useRouter();
  return (
    <div onClick={() => (skeleton ? undefined : router.push(`/playlist/${id}`))} className="w-full cursor-pointer flex flex-col p-4 bg-base-300 hover:bg-base-200 rounded-lg shadow">
      {skeleton && (
        <>
          <div className="w-full h-[194px] bg-gray-400 animate-pulse rounded-md" />
          <div className="w-8/12 h-2 bg-gray-400 rounded-full animate-pulse mt-2"></div>
          <div className="w-8 h-2 bg-gray-400 rounded-full animate-pulse mt-2"></div>
        </>
      )}
      {!skeleton && (
        <>
          <Image src={image!} width={194} height={194} loading={"lazy"} alt="Recommendation Cover" className="w-full" />
          <h1 className="font-extrabold text-xl mt-2">{title}</h1>
          <p className="font-normal text-sm text-gray-500">{description}</p>
        </>
      )}
    </div>
  );
}
