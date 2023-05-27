export interface ISpotifyUserPlaylistResponse {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: PlaylistItem[];
}

export interface PlaylistItem {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: PlaylistImage[];
  name: string;
  owner: PlaylistOwner;
  public: boolean;
  snapshot_id: string;
  tracks: PlaylistTracks;
  type: string;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface PlaylistImage {
  url: string;
  height: number;
  width: number;
}

export interface PlaylistOwner {
  external_urls: ExternalUrls2;
  followers: PlaylistFolowers;
  href: string;
  id: string;
  type: string;
  uri: string;
  display_name: string;
}

export interface ExternalUrls2 {
  spotify: string;
}

export interface PlaylistFolowers {
  href: string;
  total: number;
}

export interface PlaylistTracks {
  href: string;
  total: number;
}
