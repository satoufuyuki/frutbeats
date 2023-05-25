"use client";
import { useSession } from "next-auth/react";
import { PlaylistCard } from "../lib/components/PlaylistCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
    const router = useRouter();
    const { status, data } = useSession({
        required: true,
        onUnauthenticated() {
          return router.replace('/login')
        },
      });
    
      const [recommendation, setRecommendation] = useState<any>(undefined);
      useEffect(() => {
        if (status === "authenticated" && !recommendation) {
          const fetchRecommendation = async () => {
            const res = await fetch("https://api.spotify.com/v1/browse/featured-playlists?country=ID&locale=id_ID&limit=4&offset=0", {
              headers: {
                Authorization: `Bearer ${data.access_token}`
              }
            });
            const d = await res.json();
            setRecommendation(d.playlists.items);
          }
    
          fetchRecommendation()
        }
      }, [status, recommendation, data?.access_token]);

    return (<>
    <div className="flex justify-between items-center">
            <h1 className='font-bold text-2xl'>Good Morning, {data?.user?.name}</h1>
            <input type="text" placeholder="Search a song" className="input input-bordered h-10 w-full max-w-xs" />
          </div>
          <br/>
          <div className="grid grid-cols-4 gap-x-4">
            {!recommendation 
            ? new Array(4).fill(null).map((_, i) => <PlaylistCard key={i} skeleton />)
            : recommendation.map((x: any, i: number) => 
              <PlaylistCard key={i} id={x.id} title={x.name} description={x.description} image={x.images[0].url}/>)
            }
          </div>
          </>
    )
}