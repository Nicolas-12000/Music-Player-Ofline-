// src/ui/components/SongCard.tsx
import { Draggable } from '@hello-pangea/dnd';
import { Song } from '../../core/entities/Song';
import { FiHeart } from 'react-icons/fi';
import { useState } from 'react';

export const SongCard = ({ song, index, onLike }: {
  song: Song;
  index: number;
  onLike: (id: string) => void;
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(song.id);
  };

  return (
    <Draggable draggableId={song.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="group bg-gray-800 p-4 mb-2 rounded-lg hover:bg-gray-700 transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{song.title}</h3>
              <p className="text-gray-400 text-sm">{song.formattedDuration}</p>
            </div>
            
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={1}
                value={index + 1}
                className="w-12 bg-gray-700 px-2 py-1 rounded text-center"
                readOnly
              />
              <button
                onClick={handleLike}
                className={`hover:scale-110 transition-transform ${
                  isLiked ? 'text-red-500 fill-red-500' : 'text-white'
                }`}
              >
                <FiHeart size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};