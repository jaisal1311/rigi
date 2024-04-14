import { Video } from "@/model/video";
import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import type { Identifier, XYCoord } from "dnd-core";

interface VideoCardProps {
  video: Video;
  onSelect: () => void;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  index: number;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const VideoCard: React.FC<VideoCardProps> = ({
  video,
  onSelect,
  moveCard,
  index,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "video",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "video",
    item: () => {
      return { id: video.id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div
      ref={ref}
      onClick={onSelect}
      className="shadow-md p-5"
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      <video width="308px" height="60px" className="rounded-md overflow-hidden">
        <source src={`${video.sources[0]}#t=10,20`} type="video/mp4" />
      </video>
      <h1 className="font-medium text-xl">{video.title}</h1>
    </div>
  );
};

export default VideoCard;
