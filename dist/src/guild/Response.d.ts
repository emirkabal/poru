import { Track, trackData } from "./Track";
export type LavaLinkLoadTypes = "track" | "playlist" | "search" | "empty" | "error";
export type Severity = "common" | "suspicious" | "fault";
export interface PluginInfo {
    type?: "album" | "playlist" | "artist" | "recommendations" | (string & {});
    albumName?: string;
    albumUrl?: string;
    albumArtUrl?: string;
    artistUrl?: string;
    artistArtworkUrl?: string;
    previewUrl?: string;
    isPreview?: boolean;
    totalTracks?: number;
    identifier?: string;
    artworkUrl?: string;
    author?: string;
    url?: string;
    uri?: string;
    clientData?: {
        previousTrack?: boolean;
        [key: string]: any;
    };
}
export interface PlaylistInfo {
    type: "playlist";
    name: string;
    selectedTrack: number;
}
export interface NoPlaylistInfo {
    type?: "noPlaylist";
    name?: null;
    selectedTrack?: 0;
}
export type PlaylistInfoType = (PlaylistInfo | NoPlaylistInfo) & Partial<PluginInfo>;
export interface LoadTrackResponseTrack {
    loadType: "track";
    data: trackData;
    pluginInfo: PluginInfo;
}
export interface LoadTrackResponseSearch {
    loadType: "search";
    data: trackData[];
    pluginInfo: PluginInfo;
}
export interface LoadTrackResponseEmpty {
    loadType: "empty";
    data: {};
    pluginInfo: PluginInfo;
}
export interface LoadTrackResponseError {
    loadType: "error";
    data: {
        message?: string;
        severity: Severity;
        cause: string;
    };
    pluginInfo: PluginInfo;
}
export interface LoadTrackResponsePlaylist {
    loadType: "playlist";
    data: {
        /**
         * The info of the playlist
         */
        info: {
            /**
             * The name of the playlist
             */
            name: string;
            /**
             * The selected track of the playlist (-1 if no track is selected)
             */
            selectedTrack: number;
        } & Partial<PlaylistInfo>;
        /**
         * Addition playlist info provided by plugins
         */
        pluginInfo: any;
        /**
         * The tracks of the playlist
         */
        tracks: trackData[];
    };
    pluginInfo: PluginInfo;
}
export type LoadTrackResponse = LoadTrackResponseTrack | LoadTrackResponseSearch | LoadTrackResponseEmpty | LoadTrackResponseError | LoadTrackResponsePlaylist;
export declare class Response {
    tracks: Track[];
    loadType: LavaLinkLoadTypes;
    playlistInfo: PlaylistInfoType;
    pluginInfo: PluginInfo;
    constructor(response: LoadTrackResponse, requester: any);
    private handleTracks;
    private convertNodelinkResponseToLavalink;
}
