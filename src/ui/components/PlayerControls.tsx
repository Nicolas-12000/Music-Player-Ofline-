// src/ui/components/PlayerControls.tsx
import { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa';

export const PlayerControls = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 1));
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <div className="flex items-center justify-center gap-4 mb-4">
        <button className="p-2 hover:scale-110 transition-transform">
          <FaStepBackward size={24} />
        </button>
        
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-4 bg-indigo-600 rounded-full hover:scale-110 transition-transform"
        >
          {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
        </button>
        
        <button className="p-2 hover:scale-110 transition-transform">
          <FaStepForward size={24} />
        </button>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm">0:00</span>
        <progress
          value={progress}
          max="100"
          className="flex-1 h-2 bg-gray-700 rounded-full"
        />
        <span className="text-sm">3:45</span>
      </div>
    </div>
  );
};