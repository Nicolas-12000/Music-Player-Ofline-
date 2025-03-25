// src/core/decorators/SongDecorators.ts
import { Song, SongMetadata } from "../entities/Song";

/**
 * Interfaz base para los decoradores de canciones
 */
export interface SongDecorator extends SongMetadata {
  decoratedSong: Song;
}

/**
 * Decorador para añadir letra a una canción
 */
export class LyricsDecorator implements SongDecorator {
  constructor(
    public decoratedSong: Song,
    public lyrics: string
  ) {}

  // Propiedades del SongMetadata
  get id(): string { return this.decoratedSong.id; }
  get title(): string { return this.decoratedSong.title; }
  get duration(): number { return this.decoratedSong.duration; }
  get likes(): number { return this.decoratedSong.likes; }
  get filePath(): string | undefined { return this.decoratedSong.filePath; }
}

/**
 * Decorador para añadir funcionalidad de formato especial
 */
export class FormattedSongDecorator implements SongDecorator {
  constructor(public decoratedSong: Song) {}

  // Propiedades del SongMetadata
  get id(): string { return this.decoratedSong.id; }
  get title(): string { return this.decoratedSong.title; }
  get duration(): number { return this.decoratedSong.duration; }
  get likes(): number { return this.decoratedSong.likes; }
  get filePath(): string | undefined { return this.decoratedSong.filePath; }

  /**
   * Devuelve un string formateado con la información de la canción
   */
  get formattedDetails(): string {
    return `${this.title} - ${this.duration}s - ${this.likes}❤️`;
  }

  /**
   * Añade likes con bonificación
   */
  addLikesWithBonus(likes: number): void {
    this.decoratedSong.likes += Math.floor(likes * 1.2); // 20% extra
  }
}