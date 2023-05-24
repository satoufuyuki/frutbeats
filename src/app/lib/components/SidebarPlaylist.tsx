import { useInfiniteQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ISpotifyUserPlaylistResponse } from "../typings";
import InfiniteScroll from "react-infinite-scroll-component";

const PlaylistSkeleton = () => <ul className="flex flex-col gap-y-2">
    {new Array(3).fill(null).map((_, i) => 
    <li key={i} className='flex items-center gap-4 rounded-md bg-base-100'>
      <div className='rounded-l-md w-[35px] h-[35px] bg-gray-600 animate-pulse'></div>
      <div className='rounded-full max-w-[10rem] w-4/6 h-[10px] bg-gray-600 animate-pulse'></div>
    </li>)}
  </ul>

export function SidebarPlaylist() {
  const { status: authStatus, data: sessionData } = useSession({
    required: true
  });
  
  const fetchPlaylists = async ({ pageParam = 0 }) => {
    console.log(pageParam);
    const res = await fetch(
      `https://api.spotify.com/v1/me/playlists?offset=${pageParam}&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${sessionData?.access_token}`,
        },
      }
    )
    return res.json();
  }

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['playlists'],
    queryFn: fetchPlaylists,
    getNextPageParam: (lastPage, pages) =>{
      console.log(lastPage.offset + lastPage.limit);
      return lastPage.next ? lastPage.offset + lastPage.limit : false
    },
  })


  if (authStatus === "loading" || !data) {
    return <PlaylistSkeleton/>
  }
  
  return (
    <InfiniteScroll
      scrollableTarget="sidebar"
      className="flex flex-col gap-y-2"
      dataLength={data?.pages.length * 10}
      next={fetchNextPage}
      hasMore={hasNextPage ?? false}
      loader={<PlaylistSkeleton/>}
    >
      {data?.pages.map((d: ISpotifyUserPlaylistResponse) => d.items.map((p, i) => (
        <div key={i} className='flex justify-center items-center gap-4 rounded-md bg-base-100'>
          <Image loading="lazy" className='rounded-l-md' src={p.images[0].url} width={35} height={35} alt="Playlist image"/>
          <a 
            title={p.name.length > 15 ? p.name : ""}
            className='font-bold w-full overflow-hidden whitespace-nowrap'>
              {p.name.length > 15 ? p.name.substring(0, 15) + "..." : p.name}
          </a>
        </div>
      )))}
    </InfiniteScroll>
  )
}