"use client";
import { Loader } from "@/app/lib/components/Loader";
import { Meta } from "@/app/lib/components/Meta";
import { PlaylistItem } from "@/app/lib/components/PlaylistItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Likes() {
  const router = useRouter();
  const { status: sessionStatus, data: sessionData } = useSession({
    required: true,
    onUnauthenticated() {
      return router.replace("/login");
    },
  });

  const fetchTracks = async ({ pageParam = 0 }) => {
    const res = await fetch(`https://api.spotify.com/v1/me/tracks?offset=${pageParam}&limit=20`, {
      headers: {
        Authorization: `Bearer ${sessionData?.accessToken}`,
      },
    });
    return res.json();
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["liked_tracks"],
    queryFn: fetchTracks,
    getNextPageParam: (lastPage) => {
      return lastPage.next ? lastPage.offset + lastPage.limit : false;
    },
  });

  if (sessionStatus === "loading") {
    return (
      <>
        <Meta title="Likes" />
        <div className="flex h-screen">
          <Loader className="m-auto" />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex justify-between items-start flex-col lg:flex-row lg:items-center gap-y-4">
        <h1 className="font-bold text-3xl">Your Liked Tracks</h1>
      </div>
      <br />
      <InfiniteScroll
        scrollableTarget="content"
        className="flex flex-col gap-y-2"
        dataLength={data?.pages?.length! * 10}
        next={fetchNextPage}
        hasMore={hasNextPage ?? false}
        loader={<Loader className="" />}>
        {data?.pages.map((d) =>
          d.items.map((p: any, i: number) => <PlaylistItem artist={p.track?.artists[0]?.name} name={p.track.name} image={p.track.album.images[0]?.url} key={i} id={p.track.id} uri={p.track.uri} />)
        )}
      </InfiniteScroll>
      <div className="h-[10rem]"></div>
    </>
  );
}
