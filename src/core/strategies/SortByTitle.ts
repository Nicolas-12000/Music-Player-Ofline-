// src/core/strategies/SortByTitle.ts
import { SortStrategy } from "./SortStrategy";
import { DoublyLinkedList } from "../entities/DoublyLinkedList";

/**
 * Estrategia concreta: Ordenar por título (A-Z)
 */
export class SortByTitle implements SortStrategy {
  sort(list: DoublyLinkedList): void {
    const songs = this.extractAndSort(list);
    this.rebuildList(list, songs);
  }

  private extractAndSort(list: DoublyLinkedList): string[] {
    // Convertir lista en array y ordenar
    return list.songs
      .map(song => song.title)
      .sort((a, b) => a.localeCompare(b));
  }

  private rebuildList(list: DoublyLinkedList, sortedTitles: string[]): void {
    const originalSongs = list.songs;
    list.clear();
    
    sortedTitles.forEach(title => {
      const song = originalSongs.find(s => s.title === title);
      if (song) list.addToFront(song);
    });
  }
}