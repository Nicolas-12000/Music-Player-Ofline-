// src/core/strategies/SortStrategy.ts
import { DoublyLinkedList } from "../entities/DoublyLinkedList";

/**
 * Interfaz Strategy para algoritmos de ordenamiento
 */
export interface SortStrategy {
  sort(list: DoublyLinkedList): void;
}