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
  private readonly KEY = 'musicPlayerPlaylists'; // Clave unificada

  savePlaylist(playlist: Playlist): void {
    const playlists = this.loadPlaylists();
    const existingIndex = playlists.findIndex(p => p.name === playlist.name);
    
    if (existingIndex >= 0) {
      playlists[existingIndex] = this.serializePlaylist(playlist);
    } else {
      playlists.push(this.serializePlaylist(playlist));
    }
    
    localStorage.setItem(this.KEY, JSON.stringify(playlists));
  }

  loadPlaylists(): Playlist[] {
    try {
      const data = localStorage.getItem(this.KEY);
      if (!data) return [];
      
      return JSON.parse(data, this.reviver.bind(this));
    } catch (error) {
      console.error('Error loading playlists:', error);
      return [];
    }
  }

  deletePlaylist(name: string): void {
    const playlists = this.loadPlaylists().filter(p => p.name !== name);
    localStorage.setItem(this.KEY, JSON.stringify(playlists));
  }

  private serializePlaylist(playlist: Playlist): any {
    return {
      ...playlist,
      songs: playlist.songs.songs.map(song => ({
        id: song.id,
        title: song.title,
        duration: song.duration,
        likes: song.likes,
        filePath: song.filePath
      }))
    };
  }

  private reviver(key: string, value: any): any {
    if (key === 'songs') {
      const list = new DoublyLinkedList();
      // Revertir el orden porque addToFront los añade al principio
      value.reverse().forEach((song: any) => {
        list.addToFront(new Song(
          song.id,
          song.title,
          song.duration,
          song.likes,
          song.filePath
        ));
      });
      return list;
    }
    
    if (key === '' && value?.name) { // Para el objeto Playlist principal
      return new Playlist(
        value.name,
        value.songs || new DoublyLinkedList()
      );
    }
    
    return value;
  }
}