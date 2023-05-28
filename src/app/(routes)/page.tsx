"use client";
import { useSession } from "next-auth/react";
import { PlaylistCard } from "../lib/components/PlaylistCard";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PlaylistItem } from "../lib/components/PlaylistItem";
import { Meta } from "../lib/components/Meta";

export default function Home() {
  const router = useRouter();
  const query = useSearchParams();
  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      return router.replace("/login");
    },
  });

  const [recommendation, setRecommendation] = useState<any>(undefined);
  const [tracks, setTracks] = useState<any[]>([]);
  const [time, setTime] = useState("");

  useEffect(() => {
    const d = new Date();
    const h = d.getHours();
    if (h >= 0 && h < 12) {
      if (time === "Morning") return;
      setTime("Morning");
    } else if (h >= 12 && h < 18) {
      if (time === "Afternoon") return;
      setTime("Afternoon");
    } else {
      if (time === "Evening") return;
      setTime("Evening");
    }
  }, [time]);

  useEffect(() => {
    if (!query || !data) return;
    const q = query.get("q");
    if (!q) return;
    const fetchTracks = async () => {
      const res = await fetch(`https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(q as string)}&offset=0&limit=10`, {
        headers: {
          Authorization: `Bearer ${data!.accessToken}`,
        },
      });
      const d = await res.json();
      setTracks(d.tracks.items);
    };

    const timeout = setTimeout(fetchTracks, 500);
    return () => clearTimeout(timeout);
  }, [query, data]);

  useEffect(() => {
    if (status === "authenticated" && !recommendation) {
      const fetchRecommendation = async () => {
        const res = await fetch("https://api.spotify.com/v1/browse/featured-playlists?country=ID&locale=id_ID&limit=4&offset=0", {
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
          },
        });
        const d = await res.json();
        setRecommendation(d.playlists.items);
      };

      fetchRecommendation();
    }
  }, [status, recommendation, data?.accessToken]);

  return (
    <>
      <Meta title="Home" />
      <div className="flex justify-between items-start flex-col lg:flex-row lg:items-center gap-y-4">
        <h1 className="font-bold text-2xl">
          Good {time}, {data?.user?.name}
        </h1>
        <input
          value={query.get("q") ?? ""}
          onChange={(e) => router.replace(`/?q=${encodeURIComponent(e.currentTarget.value)}`)}
          type="text"
          placeholder="Search a song"
          className="input input-bordered h-10 w-full max-w-xs"
        />
      </div>
      <br />
      {(() => {
        if (query.has("q") && query.get("q") !== "") {
          return (
            <>
              <div className="flex flex-col w-full gap-y-2">
                {tracks.map((x: any, i: number) => (
                  <PlaylistItem key={i} name={x.name} artist={x.artists[0].name} image={x.album.images[0].url} uri={x.uri} id={x.id} />
                ))}
              </div>
            </>
          );
        }

        return (
          <>
            <div
              className="max-w-[250px] m-auto grid grid-cols-1 gap-x-4 gap-y-7
        md:grid-cols-3 lg:grid-cols-4 md:max-w-full
      ">
              {!recommendation
                ? new Array(4).fill(null).map((_, i) => <PlaylistCard key={i} skeleton />)
                : recommendation.map((x: any, i: number) => <PlaylistCard key={i} id={x.id} title={x.name} description={x.description} image={x.images[0].url} />)}
            </div>
          </>
        );
      })()}

      <div className="h-[10rem]"></div>
    </>
  );
}
