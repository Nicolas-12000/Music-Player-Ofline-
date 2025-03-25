// src/adapters/audio/AudioPlayerAdapter.ts
export interface IAudioPlayer {
    play(blob: Blob): void;
    pause(): void;
    resume(): void;
    stop(): void;
    seek(time: number): void;
    currentTime: number;
    duration: number;
    onEnded(callback: () => void): void;
  }
  
  export class AudioPlayerAdapter implements IAudioPlayer {
    private audioElement: HTMLAudioElement;
    private blobUrl: string | null = null;
  
    constructor() {
      this.audioElement = new Audio();
    }
  
    play(blob: Blob): void {
      this.cleanup();
      this.blobUrl = URL.createObjectURL(blob);
      this.audioElement.src = this.blobUrl;
      this.audioElement.play();
    }
  
    pause(): void {
      this.audioElement.pause();
    }
  
    resume(): void {
      this.audioElement.play();
    }
  
    stop(): void {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
      this.cleanup();
    }
  
    seek(time: number): void {
      this.audioElement.currentTime = time;
    }
  
    get currentTime(): number {
      return this.audioElement.currentTime;
    }
  
    get duration(): number {
      return this.audioElement.duration || 0;
    }
  
    onEnded(callback: () => void): void {
      this.audioElement.addEventListener('ended', callback);
    }
  
    private cleanup(): void {
      if (this.blobUrl) {
        URL.revokeObjectURL(this.blobUrl);
        this.blobUrl = null;
      }
    }
  }