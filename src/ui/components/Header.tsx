// src/ui/components/Header.tsx
import { useState } from 'react';
import { PlaylistManager } from '../../core/use-cases/PlayerlistManager';

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const manager = PlaylistManager.getInstance();

  const handleCreatePlaylist = () => {
    const name = prompt('Nombre de la nueva playlist:');
    if (name) manager.createPlaylist(name);
  };

  return (
    <header className="bg-gray-800 p-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-white">🎵 Música Offline</h1>
      
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Buscar canción..."
          className="px-4 py-2 rounded-lg bg-gray-700 text-white w-64"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <button
          onClick={handleCreatePlaylist}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
        >
          Nueva Playlist
        </button>
      </div>
    </header>
  );
};