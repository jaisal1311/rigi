import * as React from "react";
import { Video } from "../model/video";

const initialState = {
  currentVideo: null,
  setCurrentVideo: () => null,
};

interface IContext {
  currentVideo: Video | null;
  setCurrentVideo: React.Dispatch<React.SetStateAction<Video | null>>;
}

export const PlayerContext = React.createContext<IContext>(initialState);

const PlayerContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentVideo, setCurrentVideo] = React.useState<Video | null>(null);

  const state = React.useMemo(
    () => ({ currentVideo, setCurrentVideo }),
    [currentVideo]
  );

  return (
    <PlayerContext.Provider value={state}>{children}</PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
