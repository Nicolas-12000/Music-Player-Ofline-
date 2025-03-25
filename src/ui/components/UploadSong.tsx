import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { SongCard } from './SongCard';
import { Song } from '../../core/entities/Song';
import { Playlist } from '../../core/entities/Playlist';
import { useState } from 'react';
import { IndexedDBAdapter } from '../../adapters/storage/IndexDBAdapter';

export const DragAndDropList = ({ compact, songs, onReorder, onLike }: {
  compact?: boolean;
  songs: Song[];
  onReorder: (from: number, to: number) => void;
  onLike: (id: string) => void;
}) => {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    onReorder(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="songs">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={compact ? "space-y-1" : "space-y-2"}
          >
            {songs.map((song, index) => (
              <SongCard
                key={song.id}
                song={song}
                index={index}
                onLike={onLike}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export const UploadSong = ({ playlist, miniMode }: { 
  playlist: Playlist | null;
  miniMode?: boolean;
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const audioStorage = new IndexedDBAdapter();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !playlist) return;
    
    setIsUploading(true);
    const file = e.target.files[0];
    
    try {
      const id = crypto.randomUUID();
      
      const newSong = new Song(
        id,
        file.name.replace(/\.[^/.]+$/, ""),
        await getAudioDuration(file),
        0,
        `audio-${id}`
      );

      await audioStorage.saveAudio(`audio-${id}`, file);
      
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
      <label className={miniMode ? "p-1 text-sm" : "p-2"}>
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