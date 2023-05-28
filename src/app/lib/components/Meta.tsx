"use client";

import Head from "next/head";

export function Meta({ title, name = "FrutBeats", description, color = "#f28c18" }: { title: string; name?: string; description?: string; color?: string }) {
  return (
    <>
      <Head>
        <title>
          {name} - {title}
        </title>
        <meta name="twitter:title" content={`${name} - ${title}`} />
        <meta property="og:title" content={`${name} - ${title}`} />
        <meta property="og:site_name" content={name} />
        {description !== undefined && (
          <>
            <meta name="description" content={description} />
            <meta name="twitter:description" content={description} />
            <meta property="og:description" content={description} />
          </>
        )}
        {color !== undefined && <meta name="theme-color" content={color} />}
        <meta property="og:locale" content="id_ID" />
        <meta property="og:type" content="website" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico"></link>
        <link rel="shortcut icon" type="image/png" href="/icon.png" />
      </Head>
    </>
  );
}
