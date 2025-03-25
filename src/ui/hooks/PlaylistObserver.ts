// src/ui/hooks/usePlaylistObserver.ts
import { useEffect, useState } from 'react';
import { Playlist } from '../../../src/core/entities/Playlist';

export const usePlaylistObserver = (playlist: Playlist) => {
    const [updateTrigger, setUpdateTrigger] = useState(0);
  
    useEffect(() => {
      const observer = {
        onPlaylistChanged: () => setUpdateTrigger(prev => prev + 1)
      };
  
      playlist.addObserver(observer);
      return () => playlist.removeObserver(observer);
    }, [playlist]);
  
    return { updateTrigger };
  };