import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { SongCard } from './SongCard';
import { Song } from '../../core/entities/Song';

export const DragAndDropList = ({ songs, onReorder, onLike }: {
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
            className="mb-4"
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