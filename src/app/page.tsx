"use client";
import { getSession, signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import { Loader } from './lib/components/Loader';
import { Navbar } from './lib/components/Navbar';
import { useRouter } from 'next/navigation';
import { WebPlaybackSDK } from 'react-spotify-web-playback-sdk';
import { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHome } from '@fortawesome/free-solid-svg-icons';
import { Sidebar } from './lib/components/Sidebar';
import { Player } from './lib/components/Player';

export default function Home() {
  const router = useRouter();
  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      return router.replace('/login')
    },
  });

  const getOAuthToken = useCallback((cb: any) => {
    if (status === "authenticated") {
      cb(data.access_token);
    }
  }, [status, data]);

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

  if (status === "loading") return <>
    <div className="flex h-screen"><Loader className='m-auto'/></div>
  </>;
  return <>
    <Navbar/>
    <div className='flex'>
      <Sidebar/>
      <div id="content">
        <div className='p-12'></div>
        <Player/>
      </div>
    </div>
    <WebPlaybackSDK
      initialDeviceName="FrutBeats"
      initialVolume={1}
      getOAuthToken={getOAuthToken}></WebPlaybackSDK>
  </>
}
