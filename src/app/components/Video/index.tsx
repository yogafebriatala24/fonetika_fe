import React from "react";
import VideoContent from "./Video";

export default function VideoPage() {
  const youtubeLinks = [
    "https://www.youtube.com/watch?v=tgbNymZ7vqY",
    "https://youtu.be/CitMfsS74OY?si=Vbmx_T87xK-wC4kZ",
    "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
    "https://youtu.be/gcIhL1x7MvQ?si=aOxJDbrM-WM_zrnz",
  ];
  return (
    <>
      <VideoContent listVideo={youtubeLinks} />
    </>
  );
}
