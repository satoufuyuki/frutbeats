import { Metadata } from "next";

export function Meta({ description, color = "#f28c18" }: { color?: string; description?: string; }): Metadata {
  if (!description) {
    description = `FrutBeats adalah tempat online yang menghadirkan pengalaman pemutar musik terbaik. Temukan artis baru dan eksplorasi koleksi musik pilihan sesuai suasana hati dan genre yang kamu sukai. Nikmati antarmuka yang elegan, dan fitur yang canggih. Biarkan musik bermain di FrutBeats!`;
  }

  return {
    title: "FrutBeats",
    description: description,
    colorScheme: "dark",
    themeColor: color,
    icons: [
      {
        rel: "icon",
        type: "image/x-icon",
        url: "/favicon.ico",
      },
      {
        rel: "shortcut icon",
        type: "image/png",
        url: "/icon.png",
      }
    ],
    twitter: {
      title: "FrutBeats",
      description
    },
    openGraph: {
      title: `FrutBeats`,
      description: description,
      url: 'https://player.frutbits.org',
      siteName: 'FrutBeats',
      images: [
        {
          url: '/icon.png',
          width: 800,
          height: 600,
        }
      ],
      locale: 'id_ID',
      type: 'website',
    },
  };
}