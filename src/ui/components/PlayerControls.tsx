import { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa';
import { AudioPlayerAdapter } from '../../adapters/audio/AudioPlayerAdapter';
import { Song } from '../../core/entities/Song';
import { IndexedDBAdapter } from '../../adapters/storage/IndexDBAdapter';

interface PlayerControlsProps {
  currentSong?: Song | null;
  playlist: Song[];
  onNext: () => void;
  onPrev: () => void;
}

export const PlayerControls = ({ 
  currentSong, 
  playlist,
  onNext,
  onPrev 
}: PlayerControlsProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioPlayer = useRef<AudioPlayerAdapter>(new AudioPlayerAdapter());

  useEffect(() => {
    if (!currentSong) return;
    
    const playSong = async () => {
      const storage = new IndexedDBAdapter();
      const audioBlob = await storage.getAudio(`audio-${currentSong.id}`);
      audioPlayer.current.play(audioBlob);
      setIsPlaying(true);
    };

    playSong();
    
    audioPlayer.current.onEnded(() => {
      onNext();
    });

    return () => audioPlayer.current.stop();
  }, [currentSong]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((audioPlayer.current.currentTime / audioPlayer.current.duration) * 100);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioPlayer.current.pause();
    } else {
      audioPlayer.current.resume();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <div className="flex items-center justify-center gap-4 mb-4">
        <button onClick={onPrev} className="p-2 hover:scale-110 transition-transform">
          <FaStepBackward size={24} />
        </button>
        
        <button 
          onClick={handlePlayPause}
          className="p-4 bg-indigo-600 rounded-full hover:scale-110 transition-transform"
        >
          {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
        </button>
        
        <button onClick={onNext} className="p-2 hover:scale-110 transition-transform">
          <FaStepForward size={24} />
        </button>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm">
          {formatTime(audioPlayer.current.currentTime)}
        </span>
        <progress
          value={progress}
          max="100"
          className="flex-1 h-2 bg-gray-700 rounded-full"
        />
        <span className="text-sm">
          {formatTime(audioPlayer.current.duration)}
        </span>
      </div>
    </div>
  );
};

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};