import { Header } from './ui/components/Header';
import { PlaylistSelector } from './ui/components/PlaylistSelector';
import { DragAndDropList } from './ui/components/DragAndDropList';
import { PlayerControls } from './ui/components/PlayerControls';
import { PlaylistManager } from './core/use-cases/PlayerlistManager';
import { usePlaylistObserver } from './ui/hooks/PlaylistObserver';
import { Playlist } from './core/entities/Playlist';
import { Song } from './core/entities/Song';
import { useState } from 'react';
import Background from './ui/components/Backgrount';
import { UploadSong } from './ui/components/UploadSong';
import { IndexedDBAdapter } from './adapters/storage/IndexDBAdapter';

export default function App() {
  const manager = PlaylistManager.getInstance();
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const { updateTrigger } = usePlaylistObserver(currentPlaylist || new Playlist('default'));

  const handleReorder = (fromIndex: number, toIndex: number) => {
    if (!currentPlaylist) return;
    currentPlaylist.songs.moveNode(fromIndex, toIndex);
  };

  const handleLike = (songId: string) => {
    if (!currentPlaylist) return;
    const song = currentPlaylist.songs.songs.find(s => s.id === songId);
    if (song) song.likes++;
  };

  const handleNextSong = () => {
    if (!currentPlaylist) return;
    const nextSong = currentPlaylist.songs.next();
    setCurrentSong(nextSong);
  };

  const handlePrevSong = () => {
    if (!currentPlaylist) return;
    const prevSong = currentPlaylist.songs.prev();
    setCurrentSong(prevSong);
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <Background />
      
      <div className="relative z-10">
        <Header />
        
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-4 gap-4">
            <PlaylistSelector 
              onSelect={(name) => {
                const playlist = manager['playlists'].find(p => p.name === name);
                setCurrentPlaylist(playlist || null);
                setCurrentSong(null); // Resetear canción al cambiar playlist
              }}
            />
            
            <div className="col-span-3">
              {currentPlaylist && (
                <>
                  <h2 className="text-xl font-bold mb-4">{currentPlaylist.name}</h2>
                  <UploadSong playlist={currentPlaylist} />
                  <DragAndDropList
                    songs={currentPlaylist.songs.songs}
                    onReorder={handleReorder}
                    onLike={handleLike}
                    key={updateTrigger}
                  />
                </>
              )}
              <PlayerControls 
                currentSong={currentSong}
                playlist={currentPlaylist?.songs.songs || []}
                onNext={handleNextSong}
                onPrev={handlePrevSong}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}