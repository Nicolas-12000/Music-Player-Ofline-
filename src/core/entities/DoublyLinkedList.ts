// src/core/entities/DoublyLinkedList.ts
import { SongNode } from "./SongNode";
import { Song } from "./Song";

export class DoublyLinkedList {
  private head: SongNode | null = null;
  private tail: SongNode | null = null;
  private current: SongNode | null = null;
  private length: number = 0;

  /**
   * Adds a song to the beginning of the list
   */
  addToFront(song: Song): void {
    const newNode = new SongNode(song);
    
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.length++;
  }

  /**
   * Removes a song by its ID
   */
  removeById(id: string): void {
    let current = this.head;
    
    while (current) {
      if (current.song.id === id) {
        if (current.prev) current.prev.next = current.next;
        if (current.next) current.next.prev = current.prev;
        
        if (current === this.head) this.head = current.next;
        if (current === this.tail) this.tail = current.prev;
        
        this.length--;
        return;
      }
      current = current.next;
    }
  }

  /**
   * Moves a node from one position to another
   */
  moveNode(fromIndex: number, toIndex: number): void {
    if (fromIndex < 0 || toIndex < 0 || 
        fromIndex >= this.length || toIndex >= this.length) return;

    const node = this.getNodeAtIndex(fromIndex);
    if (!node) return;
    
    this.removeById(node.song.id);
    this.insertAtPosition(node.song, toIndex);
  }

  /**
   * Gets the next song in the list
   */
  next(): Song | null {
    this.current = this.current?.next || this.head;
    return this.current?.song || null;
  }

  /**
   * Gets the previous song in the list
   */
  prev(): Song | null {
    this.current = this.current?.prev || this.tail;
    return this.current?.song || null;
  }

  /**
   * Gets all songs as an array
   */
  get songs(): Song[] {
    const result: Song[] = [];
    let current = this.head;
    
    while (current) {
      result.push(current.song);
      current = current.next;
    }
    return result;
  }

  /**
   * Clears the entire list
   */
  clear(): void {
    this.head = null;
    this.tail = null;
    this.current = null;
    this.length = 0;
  }

  private getNodeAtIndex(index: number): SongNode | null {
    if (index < 0 || index >= this.length) return null;
    
    let current = this.head;
    let count = 0;
    
    while (current && count < index) {
      current = current.next;
      count++;
    }
    return current;
  }

  private insertAtPosition(song: Song, index: number): void {
    if (index === 0) {
      this.addToFront(song);
      return;
    }
    
    const newNode = new SongNode(song);
    const prevNode = this.getNodeAtIndex(index - 1);
    
    if (!prevNode) return;
    
    newNode.next = prevNode.next;
    newNode.prev = prevNode;
    
    if (prevNode.next) {
      prevNode.next.prev = newNode;
    }
    prevNode.next = newNode;
    
    this.length++;
  }
}