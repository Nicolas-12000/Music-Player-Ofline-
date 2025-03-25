import { useState, useEffect } from 'react';
import { PlaylistManager } from '../../core/use-cases/PlayerlistManager';

// Define the props interface
interface PlaylistSelectorProps {
  onSelect: (name: string) => void;
}

export const PlaylistSelector = ({ onSelect }: PlaylistSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [playlists, setPlaylists] = useState<string[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>('');

  useEffect(() => {
    const manager = PlaylistManager.getInstance();
    setPlaylists(manager['playlists'].map(p => p.name));
  }, []);

  const handlePlaylistSelect = (name: string) => {
    setSelectedPlaylist(name);
    setIsOpen(false);
    onSelect(name); // Call the onSelect prop with the selected playlist name
  };

  return (
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
  );
};