import { Header } from './ui/components/Header';
import { PlaylistSelector } from './ui/components/PlaylistSelector';
import { DragAndDropList } from './ui/components/DragAndDropList';
import { PlayerControls } from './ui/components/PlayerControls';
import { PlaylistManager } from './core/use-cases/PlayerlistManager';
import { usePlaylistObserver } from './ui/hooks/PlaylistObserver';
import { Playlist } from './core/entities/Playlist';
import { useState } from 'react';

export default function App() {
  const manager = PlaylistManager.getInstance();
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);
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

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-4 gap-4">
          <PlaylistSelector 
            onSelect={(name) => {
              const playlist = manager['playlists'].find(p => p.name === name);
              setCurrentPlaylist(playlist || null);
            }}
          />
          
          <div className="col-span-3">
            {currentPlaylist && (
              <>
                <h2 className="text-xl font-bold mb-4">{currentPlaylist.name}</h2>
                <DragAndDropList
                  songs={currentPlaylist.songs.songs}
                  onReorder={handleReorder}
                  onLike={handleLike}
                  key={updateTrigger}
                />
              </>
            )}
            <PlayerControls />
          </div>
        </div>
      </div>
    </div>
  );
}