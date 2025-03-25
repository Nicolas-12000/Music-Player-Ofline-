// src/ports/IPlaylistStorage.ts
import { Playlist } from "../core/entities/Playlist";
import { Song } from "../core/entities/Song";

/**
 * Interfaz para el almacenamiento persistente de playlists
 * (Implementado en LocalStorageAdapter)
 */
export interface IPlaylistStorage {
  /**
   * Guarda o actualiza una playlist completa
   * @param playlist Instancia de Playlist a guardar
   */
  savePlaylist(playlist: Playlist): Promise<void>;

  /**
   * Carga todas las playlists almacenadas
   * @returns Array de Playlist con su estructura completa
   */
  loadPlaylists(): Promise<Playlist[]>;

  /**
   * Elimina una playlist por nombre
   * @param playlistName Nombre único de la playlist
   */
  deletePlaylist(playlistName: string): Promise<void>;

  /**
   * Actualiza los metadatos de una canción específica
   * @param songId Identificador único de la canción
   * @param metadata Nuevos metadatos a actualizar
   */
  updateSongMetadata(songId: string, metadata: Partial<Song>): Promise<void>;
}