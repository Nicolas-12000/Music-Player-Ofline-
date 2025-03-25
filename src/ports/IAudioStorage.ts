// src/ports/IAudioStorage.ts
/**
 * Interfaz para el almacenamiento de archivos de audio
 * (Implementado en IndexedDBAdapter)
 */
export interface IAudioStorage {
  /**
   * Almacena un archivo de audio con su metadata
   * @param id Identificador único del audio
   * @param file Blob del archivo de audio
   * @param metadata Metadata adicional asociada
   */
  saveAudio(
    id: string,
    file: Blob,
    metadata: { name: string; duration: number }
  ): Promise<void>;

  /**
   * Recupera el archivo de audio almacenado
   * @param id Identificador único del audio
   * @returns Blob con el contenido del audio
   */
  getAudio(id: string): Promise<Blob>;

  /**
   * Elimina un archivo de audio y su metadata
   * @param id Identificador único del audio
   */
  deleteAudio(id: string): Promise<void>;

  /**
   * Recupera solo los metadatos del audio
   * @param id Identificador único del audio
   */
  getAudioMetadata(id: string): Promise<{ name: string; duration: number }>;
}