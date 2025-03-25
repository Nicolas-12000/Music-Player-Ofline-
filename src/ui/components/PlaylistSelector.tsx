import { useState, useEffect } from 'react';
import { PlaylistManager } from '../../core/use-cases/PlayerlistManager';
import { MiniPlayer } from './MiniPlayer'; // Importa el componente MiniPlayer
import { Playlist } from '../../core/entities/Playlist'; // Importa el tipo Playlist

// Define the props interface
interface PlaylistSelectorProps {
  onSelect: (name: string) => void;
  currentPlaylist: Playlist | null; // Añade la prop currentPlaylist
}

export const PlaylistSelector = ({ onSelect, currentPlaylist }: PlaylistSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [playlists, setPlaylists] = useState<string[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>('');
  const [showMiniPlayer, setShowMiniPlayer] = useState(false); // Estado para el mini-reproductor

  useEffect(() => {
    const manager = PlaylistManager.getInstance();
    setPlaylists(manager['playlists'].map(p => p.name));
  }, []);

  const handlePlaylistSelect = (name: string) => {
    setSelectedPlaylist(name);
    setIsOpen(false);
    setShowMiniPlayer(true); // Activa el mini-reproductor
    onSelect(name); // Call the onSelect prop with the selected playlist name
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-48 p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
        >
          {selectedPlaylist || "Seleccionar Playlist"}
        </button>

        {isOpen && (
          <div className="absolute mt-2 w-48 bg-gray-800 rounded-lg shadow-xl z-10">
            {playlists.map(name => (
              <div
                key={name}
                onClick={() => handlePlaylistSelect(name)}
                className="p-2 hover:bg-gray-700 cursor-pointer transition-colors"
              >
                {name}
              </div>
            ))}
          </div>
        )}
      </div>
      {showMiniPlayer && <MiniPlayer playlist={currentPlaylist} />}
    </>
  );
};