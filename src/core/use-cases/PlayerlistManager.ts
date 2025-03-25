// src/core/useCases/PlaylistManager.ts
import { Playlist } from "../entities/Playlist";
import { DoublyLinkedList } from "../entities/DoublyLinkedList";

export class PlaylistManager {
  private static instance: PlaylistManager;
  private playlists: Playlist[] = [];
  private currentPlaylist: Playlist | null = null;

  private constructor() {
    // Cargar playlists desde LocalStorage al inicializar
    this.loadPlaylists();
  }

  public static getInstance(): PlaylistManager {
    if (!PlaylistManager.instance) {
      PlaylistManager.instance = new PlaylistManager();
    }
    return PlaylistManager.instance;
  }

  public createPlaylist(name: string): void {
    const newPlaylist = new Playlist(name, new DoublyLinkedList());
    this.playlists.push(newPlaylist);
    this.savePlaylists();
  }

  public setCurrentPlaylist(playlistName: string): void {
    this.currentPlaylist = this.playlists.find(p => p.name === playlistName) || null;
  }

  public getCurrentPlaylist(): Playlist | null {
    return this.currentPlaylist;
  }

  private savePlaylists(): void {
    localStorage.setItem('playlists', JSON.stringify(this.playlists));
  }

  private loadPlaylists(): void {
    const saved = localStorage.getItem('playlists');
    if (saved) {
      this.playlists = JSON.parse(saved);
    }
  }
}