// src/core/strategies/SortByLikes.ts
import { SortStrategy } from "./SortStrategy";
import { DoublyLinkedList } from "../entities/DoublyLinkedList";
import { Song } from "../entities/Song";

/**
 * Estrategia concreta: Ordenar por likes (Mayor a menor)
 */
export class SortByLikes implements SortStrategy {
  sort(list: DoublyLinkedList): void {
    const songs = [...list.songs].sort((a, b) => b.likes - a.likes);
    this.rebuildList(list, songs);
  }

  private rebuildList(list: DoublyLinkedList, sortedSongs: Song[]): void {
    list.clear();
    sortedSongs.forEach(song => list.addToFront(song));
  }
}