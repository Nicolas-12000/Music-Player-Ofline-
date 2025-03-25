// src/ui/components/UploadSong.tsx
import { useState } from 'react';
import { Song } from '../../core/entities/Song';
import { IndexedDBAdapter } from '../../adapters/storage/IndexDBAdapter';
import { Playlist } from '../../core/entities/Playlist';

export const UploadSong = ({ playlist }: { playlist: Playlist | null }) => {
  const [isUploading, setIsUploading] = useState(false);
  const audioStorage = new IndexedDBAdapter();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !playlist) return;
    
    setIsUploading(true);
    const file = e.target.files[0];
    
    try {
      // Generar ID único
      const id = crypto.randomUUID();
      
      // Crear objeto Song con metadatos
      const newSong = new Song(
        id,
        file.name.replace(/\.[^/.]+$/, ""), // Nombre sin extensión
        await getAudioDuration(file),
        0, // Likes iniciales
        `audio-${id}` // ID de referencia al archivo
      );

      // Guardar en IndexedDB
      await audioStorage.saveAudio(`audio-${id}`, file);
      
      // Añadir a la playlist
      playlist.addSong(newSong);
      
      alert('Canción subida exitosamente!');
    } catch (error) {
      console.error('Error subiendo canción:', error);
      alert('Error al subir canción');
    } finally {
      setIsUploading(false);
    }
  };

  const getAudioDuration = (file: File): Promise<number> => {
    return new Promise((resolve) => {
      const audio = new Audio();
      audio.src = URL.createObjectURL(file);
      audio.onloadedmetadata = () => {
        resolve(Math.floor(audio.duration));
        URL.revokeObjectURL(audio.src);
      };
    });
  };

  return (
    <div className="mb-4">
      <label className="bg-indigo-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-indigo-700 transition-colors">
        {isUploading ? 'Subiendo...' : 'Subir Canción'}
        <input
          type="file"
          accept=".mp3,.wav,.ogg"
          className="hidden"
          onChange={handleFileUpload}
          disabled={!playlist || isUploading}
        />
      </label>
    </div>
  );
};