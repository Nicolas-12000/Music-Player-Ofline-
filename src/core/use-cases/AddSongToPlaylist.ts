// src/core/useCases/AddSongToPlaylist.ts
import { Playlist } from "../entities/Playlist";
import { Song } from "../entities/Song";

export class AddSongToPlaylist {
  constructor(
    private playlist: Playlist,
    private song: Song
  ) {}

  execute(): void {
    this.playlist.addSong(this.song);
  }
}