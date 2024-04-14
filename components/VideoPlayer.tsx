import { PlayerContext } from "@/contexts/PlayerContext";
import React, { useContext, useRef } from "react";

const VideoPlayer = () => {
  const { currentVideo } = useContext(PlayerContext);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div>
      <video
        ref={videoRef}
        width="1080px"
        height="600px"
        autoPlay
        controls
        muted
        className="rounded-md overflow-hidden"
        key={currentVideo?.id}
      >
        <source src={currentVideo?.sources[0]} type="video/mp4" />
      </video>
      <h1 className="font-bold text-2xl">{currentVideo?.title}</h1>
    </div>
  );
};

export default VideoPlayer;
