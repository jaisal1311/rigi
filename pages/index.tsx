import { Inter } from "next/font/google";
import VideoPlayer from "@/components/VideoPlayer";
import Playlist from "@/components/Playlist";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="flex flex-row gap-2 p-4">
      <VideoPlayer />
      <Playlist />
    </div>
  );
}
