// src/core/entities/SongNode.ts
import { Song } from "./Song";

export class SongNode {
  constructor(
    public song: Song,
    public prev: SongNode | null = null,
    public next: SongNode | null = null
  ) {}

  /**
   * Creates a string representation of the node
   */
  toString(): string {
    return `SongNode: ${this.song.title} (${this.song.id})`;
  }
}