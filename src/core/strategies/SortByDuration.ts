// src/core/strategies/SortByDuration.ts
import { SortStrategy } from "./SortStrategy";
import { DoublyLinkedList } from "../entities/DoublyLinkedList";
import { Song } from "../entities/Song";

/**
 * Estrategia concreta: Ordenar por duración (Corto a largo)
 */
export class SortByDuration implements SortStrategy {
  sort(list: DoublyLinkedList): void {
    const songs = [...list.songs].sort((a, b) => a.duration - b.duration);
    this.rebuildList(list, songs);
  }

  private rebuildList(list: DoublyLinkedList, sortedSongs: Song[]): void {
    list.clear();
    sortedSongs.reverse().forEach(song => list.addToFront(song));
  }
}