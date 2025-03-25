// src/core/useCases/ReorderSongs.ts
import { Playlist } from "../entities/Playlist";

export class ReorderSongs {
  constructor(
    private playlist: Playlist,
    private fromIndex: number,
    private toIndex: number
  ) {}

  execute(): void {
    this.playlist.songs.moveNode(this.fromIndex, this.toIndex);
  }
}