import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { SongCard } from './SongCard';
import { Song } from '../../core/entities/Song';

export const DragAndDropList = ({ compact, songs, onReorder, onLike }: {
  compact?: boolean;
  songs: Song[];
  onReorder: (from: number, to: number) => void;
  onLike: (id: string) => void;
}) => {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    onReorder(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="songs">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={compact ? "space-y-1" : "space-y-2"}
          >
            {songs.map((song, index) => (
              <SongCard
                key={song.id}
                song={song}
                index={index}
                onLike={onLike}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};