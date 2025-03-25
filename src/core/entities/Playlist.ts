// src/core/entities/Playlist.ts
import { DoublyLinkedList } from "./DoublyLinkedList";
import { Song } from "./Song";
import { SortStrategy } from "../strategies/SortStrategy";

interface PlaylistObserver {
  onPlaylistChanged(): void;
}

export class Playlist {
  private observers: PlaylistObserver[] = [];
  private sortStrategy: SortStrategy | null = null;

  constructor(
    public readonly name: string,
    public songs: DoublyLinkedList = new DoublyLinkedList()
  ) {}

  setSortStrategy(strategy: SortStrategy): void {
    this.sortStrategy = strategy;
  }

  sortSongs(): void {
    if (this.sortStrategy) {
      this.sortStrategy.sort(this.songs);
      this.notifyObservers();
    }
  }

  addObserver(observer: PlaylistObserver): void {
    this.observers.push(observer);
  }

  removeObserver(observer: PlaylistObserver): void {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  private notifyObservers(): void {
    this.observers.forEach(observer => observer.onPlaylistChanged());
  }

  addSong(song: Song): void {
    this.songs.addToFront(song);
    this.notifyObservers();
  }

  removeSong(songId: string): void {
    this.songs.removeById(songId);
    this.notifyObservers();
  }
}