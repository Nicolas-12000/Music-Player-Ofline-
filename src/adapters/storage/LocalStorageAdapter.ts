// src/adapters/storage/LocalStorageAdapter.ts
import { Playlist } from "../../core/entities/Playlist";
import { Song } from "../../core/entities/Song";
import { DoublyLinkedList } from "../../core/entities/DoublyLinkedList";

export interface IPlaylistStorage {
  savePlaylist(playlist: Playlist): void;
  loadPlaylists(): Playlist[];
  deletePlaylist(name: string): void;
}

export class LocalStorageAdapter implements IPlaylistStorage {
  private readonly KEY = 'musicPlayerPlaylists';

  savePlaylist(playlist: Playlist): void {
    const playlists = this.loadPlaylists();
    const existingIndex = playlists.findIndex(p => p.name === playlist.name);
    
    if (existingIndex >= 0) {
      playlists[existingIndex] = playlist;
    } else {
      playlists.push(playlist);
    }
    
    localStorage.setItem(this.KEY, JSON.stringify(playlists));
  }

  loadPlaylists(): Playlist[] {
    const data = localStorage.getItem(this.KEY);
    if (!data) return [];
    
    return JSON.parse(data, (key, value) => {
      if (key === 'songs') {
        const list = new DoublyLinkedList();
        value.forEach((song: Song) => list.addToFront(song));
        return list;
      }
      return value;
    });
  }

  deletePlaylist(name: string): void {
    const playlists = this.loadPlaylists().filter(p => p.name !== name);
    localStorage.setItem(this.KEY, JSON.stringify(playlists));
  }
}