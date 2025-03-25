import { useEffect, useState } from 'react';
import { DragAndDropList } from './DragAndDropList';
import { UploadSong } from './UploadSong';
import { PlayerControls } from './PlayerControls';
import { Playlist } from '../../core/entities/Playlist';
import { usePlaylistObserver } from '../hooks/PlaylistObserver';
import { Song } from '../../core/entities/Song';

interface MiniPlayerProps {
  playlist: Playlist | null;
  onClose: () => void;
}

export const MiniPlayer = ({ playlist, onClose }: MiniPlayerProps) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const { updateTrigger } = usePlaylistObserver(playlist || new Playlist('default'));

  // Sincronizar con la canción actual del reproductor principal
  useEffect(() => {
    if (playlist?.songs.songs.length) {
      setCurrentSong(playlist.songs.songs[0]);
    }
  }, [playlist]);

  const handleReorder = (fromIndex: number, toIndex: number) => {
    playlist?.songs.moveNode(fromIndex, toIndex);
  };

  const handleLike = (songId: string) => {
    const song = playlist?.songs.songs.find(s => s.id === songId);
    if (song) song.likes++;
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-music-dark/95 backdrop-blur-sm rounded-xl shadow-2xl p-4 animate-slideIn border border-music-gray">
      <div className="flex flex-col gap-4">
        {/* Cabecera */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold truncate">{playlist?.name}</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ×
            </button>
          </div>
          <UploadSong playlist={playlist} miniMode />
        </div>

        {/* Lista de canciones */}
        <div className="h-64 overflow-y-auto mini-scrollbar">
          <DragAndDropList
            songs={playlist?.songs.songs || []}
            onReorder={handleReorder}
            onLike={handleLike}
            compact
          />
        </div>

        {/* Controles de reproducción */}
        <PlayerControls 
          currentSong={currentSong}
          playlist={playlist?.songs.songs || []}
          onNext={() => playlist?.songs.next()}
          onPrev={() => playlist?.songs.prev()}
          miniMode
        />
      </div>
    </div>
  );
};
