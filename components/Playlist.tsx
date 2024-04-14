import React, { useCallback, useContext, useEffect, useState } from "react";
import { Videos } from "../data/videos-data";
import { PlayerContext } from "@/contexts/PlayerContext";
import { Video } from "@/model/video";
import update from "immutability-helper";
import VideoCard from "./VideoCard";

const Playlist = () => {
  const { setCurrentVideo } = useContext(PlayerContext);
  const [videos, setVideos] = useState<Video[]>(Videos.categories[0].videos);

  useEffect(() => {
    setCurrentVideo(videos[0]);
  }, []);

  const onSelect = useCallback((video: Video) => {
    setCurrentVideo(video);
  }, []);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setVideos((prev) =>
      update(prev, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prev[dragIndex]],
        ],
      })
    );
  }, []);

  return (
    <div className="flex flex-3 flex-col gap-4 max-h-screen overflow-scroll">
      {videos.map((video, index) => (
        <VideoCard
          key={video.id}
          video={video}
          onSelect={() => onSelect(video)}
          moveCard={moveCard}
          index={index}
        />
      ))}
    </div>
  );
};

export default Playlist;
