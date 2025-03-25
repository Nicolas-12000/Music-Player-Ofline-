// src/core/entities/Song.ts
export interface SongMetadata {
  id: string;
  title: string;
  duration: number;
  likes: number;
}

export class Song implements SongMetadata {
  constructor(
    public readonly id: string,
    public title: string,
    public duration: number,
    public likes: number = 0,
    public filePath?: string
  ) {}

  /**
   * Formats duration as mm:ss
   */
  get formattedDuration(): string {
    const minutes = Math.floor(this.duration / 60);
    const seconds = this.duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}